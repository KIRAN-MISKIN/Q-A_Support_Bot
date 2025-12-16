import { Embedding } from '../db/models/Embedding.js'
class DBOperations {
    async insertOperation(chunks){
        try{
            if(!Array.isArray(chunks) || chunks.length === 0) return;

            const docs = chunks.map(chunks=>({
                chunkId: chunks.chunkId,
                parentUrl: chunks.parentUrl,
                pageTitle: chunks.pageTitle,
                chunkText: chunks.chunkText,
                embedding: chunks.embedding
            }))
            await Embedding.insertMany(docs);
            console.log("✅ Chunks stored in DB");
            return {
                status: 'success',
                message: 'Url data stored successfully in DB'
            }
        } catch(err){
            // console.error('Error inserting embedding:', err);
            throw err;
        }
    }

    async findUrlExist(url){
        try{
            const findUrldata = await Embedding.findOne({
                parentUrl: url
            })
            return findUrldata;
        } catch(err){
            // console.error('Error finding URL:', err);
            throw err;
        }
    }

}

export default new DBOperations();
