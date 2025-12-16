import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters'

const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 300,
    chunkOverlap: 20,
});

async function splitIntoChunks(text) {
    if (!text || typeof text !== 'string') return [];
    return textSplitter.splitText(text);
}

async function getChunkData(rawDocs) {

    if (!Array.isArray(rawDocs) || rawDocs.length === 0) {
        return [];
    }

    const allChunks = [];

    for (const page of rawDocs) {
        const { url: pageUrl, title, text } = page;

        const chunks = await splitIntoChunks(text);

        chunks.forEach((chunkText, index) => {
            allChunks.push({
                chunkId: `${pageUrl}#chunk_${index}`,
                parentUrl: pageUrl,
                pageTitle: title,
                chunkText,
            });
        });
    }

    return allChunks;
}

export default getChunkData
