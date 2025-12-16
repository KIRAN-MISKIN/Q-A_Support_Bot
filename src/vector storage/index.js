import {CloudClient} from 'chromadb'
import config from '../config/index.js'
const chromconnect  = new CloudClient({
    apiKey:config.chroma_api_key,
    tenant:config.chroma_tenant,
    database:config.chroma_database
})

export default chromconnect
