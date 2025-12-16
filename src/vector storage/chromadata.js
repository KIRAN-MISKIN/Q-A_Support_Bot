import chromaconnection from './index.js'
import textEmbedding from '../embeddings/index.js'

async function getvectorydata(userQuery) {
    try {
        const collection = await chromaconnection.getCollection({
            name: "company-policy"
        })
        const userQueryEmbedded = await textEmbedding.textEmbeddingUserQuery(userQuery)
        const result = await collection.query({
            queryEmbeddings: [userQueryEmbedded],
            nResults: 2,
        })
        return result.documents[0].join('\n')
    } catch (err) {
        // console.error("Error retrieving vector data:", err);
    }
}

async function updateVectorData(storeData) {
    try {
        const collection = await chromaconnection.getOrCreateCollection({
            name: "qa_support_bot"
        })
        await collection.add({
             ids: [`doc-${i}`],
             embeddings: [storeData.embeddings],
             documents: [storeData.documents],
        })
    } catch (err) {
        // console.error("Error updating vector data:", err);
    }
}
