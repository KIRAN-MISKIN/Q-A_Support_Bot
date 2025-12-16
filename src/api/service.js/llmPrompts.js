import agents from "../../agents/index.js";
import config from "../../config/index.js";

const getMinimalHistoryForRewrite = (history, maxTurns = 2) => {
    return history
        .slice(-maxTurns * 2)
        .map(m => `${m.role}: ${m.content}`)
        .join('\n');
};

const chatLLM = async (historyString, userQuery, ragData) => {

    if (!historyString) {
        historyString = [];
    }
    if (!userQuery) {
        userQuery = "";
    }
    if (!ragData) {
        ragData = [];
    }

    const contextChunks = ragData
        .sort((a, b) => b.score - a.score)
        .filter(item => item.score >= Number(config.SCORE_THRESHOLD))
        .slice(0, Number(config.RECORD_LIMIT));

    const contextText = contextChunks
        .map((item, i) => `[${i + 1}] ${item.chunkText}`)
        .join('\n');

    const systemPrompt = `
You are a helpful AI assistant.
Answer using ONLY the context.
Keep the answer short and meaningful (3-4 sentences).
If unsure, say you don't have enough information.

context: ${contextText}

if its generic question, then please answer it.
`;

    const messages = [
        { role: "system", content: systemPrompt },
        ...historyString,
        {
            role: "user",
            content: `Question: ${userQuery}`
        }
    ];
    const response = await agents.llm.invoke(messages);

    return response.content;
};

const queryReWriteForRAG = async (userQuery, history) => {
    const historyAsText = getMinimalHistoryForRewrite(history)
    const rewritePrompt = `
You are a query rewriter for a RAG system.
Given chat history and current user question,
rewrite the question so it is fully self-contained.

Chat history:
${historyAsText}

User question:
${userQuery}

Return ONLY the rewritten question.
`;
    const standaloneQuery = await agents.llm.invoke(rewritePrompt)
    return standaloneQuery.content;
}
export default { chatLLM, queryReWriteForRAG };
