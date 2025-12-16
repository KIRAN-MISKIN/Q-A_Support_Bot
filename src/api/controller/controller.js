import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import crawlService from "../service.js/crawl.service.js";
import responseHandler from "../utils/responseHandler.js";
import embeddings from "../../embeddings/index.js";
import vectorSearch from "../service.js/vectorSearch.js";
import generateThreadId from '../utils/generate.js'
import messages from "../service.js/chatOperations.js";
import llm from '../service.js/llmPrompts.js'

const needsRewrite = (query) => {
    return /\b(it|this|that|they|those|these|he|she|course|program|detail|details|includes)\b/i
        .test(query);
};
class Controller {
    crawler = catchAsync(async (req, res, next) => {

        const { baseUrl } = req.body;

        if (!baseUrl) {
            throw new AppError("baseUrl is required", 400);
        }

        if (typeof baseUrl !== "string") {
            throw new AppError("baseUrl must be a string", 400);
        }
        const response = await crawlService(baseUrl);
        return responseHandler(res, 200, response)
    });

    getData = catchAsync(async (req, res, next) => {
        const { query, threadId } = req.body
        let final;
        if (!query) {
            throw new AppError("query is required", 400);
        }

        if (typeof query !== 'string') {
            throw new AppError("query must be a string", 400);
        }



        // chat history
        const history = await messages.llmChatHistory(threadId)
        //Rewrite userQuery based on history if need else skip
        let newQuery = query
        const needRewrite = needsRewrite(query)
        if (needRewrite) {
            console.log("Not Skiped")
            newQuery = await llm.queryReWriteForRAG(query, history)
        }
        // user query embedding
        const userQueryEmbedding = await embeddings.textEmbeddingUserQuery(newQuery);

        // Getting vector search data (used cosine similarities)
        const DbSearchResults = await vectorSearch(userQueryEmbedding)
        // final llm response
        const llmResponse = await llm.chatLLM(history, query, DbSearchResults)
        // checking threadId and DB operations
        if (!threadId) {
            const id = await generateThreadId()
            final = await messages.conversationHistory(id, query, llmResponse)
        } else {
            final = await messages.conversationHistory(threadId, query, llmResponse)
        }
        const result = {
            threadId: final.threadId,
            response: llmResponse,
        }
        return responseHandler(res, 200, result)
    })
}

export default new Controller();
