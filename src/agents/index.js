import {ChatOpenAI,OpenAIEmbeddings} from '@langchain/openai'
import config from '../config/index.js'

const llm = new ChatOpenAI({
    apiKey: config.open_api_key,
    model: config.llm_model,
    temperature: parseInt(config.llm_temperature),
    maxCompletionTokens: parseInt(config.llm_max_completion_token)
})

const embedder = new OpenAIEmbeddings({
    apiKey: config.open_api_key,
    model: config.text_embedding_model
})

export default {llm,embedder}