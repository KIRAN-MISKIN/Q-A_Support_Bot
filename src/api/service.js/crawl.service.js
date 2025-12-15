import crawlWebsite from '../../crawling/index.js'
import chunkData from '../../chunking/index.js'
import embeddings from '../../embeddings/index.js'
import DBOperations from '../../vector storage/mongoDB.js'
import AppError from '../utils/AppError.js'

const crawlerService = async (baseUrl) => {
    const data = await crawlWebsite(baseUrl);
    if (!data) {
        throw new AppError("Failed to crawl the website. Please check the URL and try again.", 500);
    }
    if (data.length === 0) {
        throw new AppError("No crawlable pages found on the website.", 404);
    }
    if (data.status === "exists") {
        throw new AppError("Url data is already extracted, Please provide new url", 400)
    }

    const chunksData = await chunkData(data)
    // embedding the chuncks
    // for (let i = 0; i < chunksData.length; i++) {
    //     const chunk = chunksData[i];
    //     const embedding = await embeddings(chunk.chunkText)
    //     chunk.embedding = embedding;
    // }

    const texts = chunksData.map(c => c.chunkText)
    const vectors = await embeddings.DocumentTextEmbedding(texts)

    vectors.forEach((vector, i) => {
        chunksData[i].embedding = vector;
    });
    // store in db
    const results = await DBOperations.insertOperation(chunksData);

    return results
}

export default crawlerService 