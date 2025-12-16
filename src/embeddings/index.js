import agent from '../agents/index.js'

async function DocumentTextEmbedding(query) {

    const result = await agent.embedder.embedDocuments(query)
    return result
}

async function textEmbeddingUserQuery(query) {
    const result = await agent.embedder.embedQuery(query)
    return result
}

export default { textEmbeddingUserQuery, DocumentTextEmbedding }
