import agent from '../agents/index.js'

async function textEmbedding(query){
    const result = await agent.embedder.embedQuery(query)
    return result
}

export default textEmbedding