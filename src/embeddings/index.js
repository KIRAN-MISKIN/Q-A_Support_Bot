import agent from '../agents/index.js'

async function DocumentTextEmbedding(query){
    // console.log(query, "got the query")
    // const result = await agent.embedder.embedQuery(query)
    const result = await agent.embedder.embedDocuments(query)
    // console.log(result, "data getting")
    return result
}

async function textEmbeddingUserQuery(query){
    const result = await agent.embedder.embedQuery(query)
    return result
}

export default {textEmbeddingUserQuery,DocumentTextEmbedding}