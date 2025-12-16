import 'dotenv/config'

const config = {
    port: process.env.PORT,
    open_api_key: process.env.OPEN_API_KEY,
    chroma_api_key: process.env.CHROMA_DB_API_KEY,
    chroma_tenant: process.env.CHROMA_DB_TENANT,
    chroma_database: process.env.CHROMA_DB_DATABASE,
    db_url: process.env.DB_URL,
    db_name: process.env.DB_NAME,
    llm_model: process.env.LLM_MODEL,
    llm_temperature: process.env.LLM_TEMPERATURE,
    text_embedding_model:process.env.EMBEDDING_MODEL,
    llm_max_completion_token:process.env.LLM_MAX_COMPLETIONTOKEN,
    chunck_size:process.env.CHUNCK_SIZE,
    chunck_overlap:process.env.CHUNCK_OVERLAP,
    DB_COLLECTION: process.env.DB_COLLECTION,
    NODE_ENV:process.env.NODE_ENV,
    SCORE_THRESHOLD: process.env.SCORE_THRESHOLD,
    RECORD_LIMIT:process.env.RECORD_LIMIT
}

export default config
