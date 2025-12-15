import {Embedding} from "../../db/models/Embedding.js";

async function vectorSearch(queryVector, limit = 3) {
    // console.log("Enterred the db search", queryVector.length)
    const result = await Embedding.aggregate([
        {
            $vectorSearch: {
                index: "vector_index",
                path: "embedding",
                queryVector: queryVector,
                limit: limit,
                numCandidates: 100
            }
        }, {
            $project: {
                _id: 0,
                chunkText: 1,
                parentUrl: 1,
                pageTitle: 1,
                score: { $meta: "vectorSearchScore" }
            }
        }
    ])
    // console.log("Done DB search")
    return result
}

export default vectorSearch;