import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters'
import crawler from '../crawling/index.js'

async function chunksData(text) {
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 300,
        chunkOverlap: 20,
    });
    const chunks = await textSplitter.splitText(text);
    return chunks
}

async function getchuckData(url) {
    const rawDocs = await crawler(url);
    if (!Array.isArray(rawDocs) || rawDocs.length === 0) {
        return false;
    }
    // console.log(rawDocs)
    const chunks = await Promise.all(
        rawDocs.map(async (x) => {
            const chunkedText = await chunksData(x.text);
            return {
                url: x.url,
                title: x.title,
                chunks: chunkedText
            }
        })
    )
    return chunks
}

export default getchuckData