import crawlWebsite from '../../crawling/index.js'
import chunkData from '../../chunking/index.js'
import embeddings from '../../embeddings/index.js'
import DBOperations from '../../vector storage/mongoDB.js'
import AppError from '../utils/AppError.js'

function checkWebsite(url) {
    if (!url) return false;
    if (!url.includes(".")) return false

    let newUrl = url.trim();

    // Add https:// if missing
    if (!newUrl.startsWith("http://") && !newUrl.startsWith("https://")) {
        newUrl = "https://" + newUrl;
    }

    // Add trailing slash if missing
    if (!newUrl.endsWith("/")) {
        newUrl = newUrl + "/";
    }

    return newUrl;
}

const crawlerService = async (baseUrl) => {
    const url = await checkWebsite(baseUrl)
    if (!mainurl) {
        return false
    }
    const checking = await DBOperations.findUrlExist(url)
    if (checking) {
        console.log("URL already crawled and exists in DB.");
        return {
            status: 'exists',
            message: 'URL already crawled and exists in DB.'
        }
    }
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

    const texts = chunksData.map(c => c.chunkText)
    const vectors = await embeddings.DocumentTextEmbedding(texts)

    vectors.forEach((vector, i) => {
        chunksData[i].embedding = vector;
    });
    // store in db
    const results = await DBOperations.insertOperation(chunksData);
    if (!results) {
        throw new AppError("Failed to store data in the database.", 500);
    }
    return results
}

export default crawlerService 
