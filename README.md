<div align="center">

# 🤖 Q&A Support Bot

### *Intelligent Question & Answer System powered by RAG*

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?logo=express)](https://expressjs.com/)
[![LangChain](https://img.shields.io/badge/🦜_LangChain-Powered-blue)](https://www.langchain.com/)

*A sophisticated Q&A support bot utilizing Retrieval Augmented Generation (RAG), embeddings, and vector databases to provide intelligent answers from crawled website content.*

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API Reference](#-api-reference) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Advanced Features](#-advanced-features)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🌟 Overview

The **Q&A Support Bot** is a production-ready AI system that combines web crawling, natural language processing, and retrieval augmented generation to create an intelligent question-answering service. It crawls websites, generates semantic embeddings, stores them in MongoDB Atlas vector database, and uses advanced RAG techniques to provide accurate, contextual responses with conversation history support.

### What Makes This Bot Special? 

- 🎯 **Smart Vector Search**: MongoDB Atlas vector search with configurable similarity thresholds
- 🧠 **Advanced RAG Pipeline**: Optimized retrieval with score-based filtering and context ranking
- 💬 **Conversational Memory**: Thread-based conversation tracking with full history persistence
- 🔧 **Highly Configurable**: Environment-based configuration for all LLM and chunking parameters
- 🛡️ **Production Ready**: Error handling, validation, and security best practices
- 📊 **Optimized Performance**: Smart chunking with overlap, configurable token limits, and efficient embeddings

---

## ✨ Key Features

### Core Capabilities
- 🕷️ **Intelligent Web Crawling**: Recursively crawls websites with URL validation and duplicate detection
- 📝 **Smart Text Chunking**: Configurable chunk size and overlap for optimal context preservation
- 🔢 **OpenAI Embeddings**: High-quality semantic embeddings using configurable OpenAI models
- 💾 **Vector Database**: MongoDB Atlas vector search with custom index configuration
- 🤖 **RAG System**: Advanced retrieval with score thresholds and dynamic context assembly
- 💬 **Conversation Threading**:  Persistent conversation history with thread-based context management
- 🎛️ **Configurable LLM**: Flexible model selection, temperature control, and token limits
- 🔍 **Semantic Search**: Vector similarity search with configurable result limits
- 🛡️ **Error Handling**:  Comprehensive error handling with custom AppError class
- 📊 **Request Logging**: Detailed logging with Morgan middleware

### Technical Highlights
- ✅ URL normalization and validation
- ✅ Duplicate content detection
- ✅ Score-based result filtering
- ✅ Context-aware response generation
- ✅ Conversation state management
- ✅ ES6 module architecture
- ✅ RESTful API design
- ✅ Environment-based configuration

---

## 🏗️ Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Client    │ ───────▶│  Express API │ ───────▶│   MongoDB   │
└─────────────┘         └──────────────┘         └─────────────┘
                              │                          │
                              ▼                          ▼
                        ┌──────────┐            ┌──────────────┐
                        │  OpenAI  │            │ Vector Index │
                        │ Embeddings│           │  & Storage   │
                        └──────────┘            └──────────────┘
                              │                          │
                              └──────────┬───────────────┘
                                         ▼
                              ┌──────────────────┐
                              │   RAG Pipeline   │
                              │  + LLM Response  │
                              └──────────────────┘
```

---

## 🛠️ Tech Stack

### Backend Framework
- **Node.js** - JavaScript runtime
- **Express. js** v5.1.0 - Web application framework
- **ES6 Modules** - Modern JavaScript module system

### AI/ML Stack
- **LangChain** v1.1.1 - LLM orchestration framework
- **@langchain/openai** v1.1.3 - OpenAI integration
- **@langchain/core** v1.1.0 - Core LangChain utilities
- **@langchain/textsplitters** v1.0.1 - Advanced text chunking

### Database & Vector Search
- **MongoDB** v7.0.0 - NoSQL database
- **Mongoose** v9.0.0 - ODM for MongoDB
- **MongoDB Atlas Vector Search** - Native vector similarity search
- **ChromaDB** v3.1.6 - Alternative vector database support

### Web Scraping
- **Axios** v1.13.2 - HTTP client for web requests
- **Cheerio** v1.1.2 - Fast HTML parsing and manipulation

### Utilities & Security
- **Zod** v4.1.13 - TypeScript-first schema validation
- **Helmet** v8.1.0 - Security headers middleware
- **Morgan** v1.10.1 - HTTP request logger
- **CORS** v2.8.5 - Cross-origin resource sharing
- **Crypto** (Node.js built-in) - Thread ID generation

### Development
- **Nodemon** v3.1.11 - Auto-restart development server
- **Dotenv** v17.2.3 - Environment variable management

---

## 📦 Installation

### Prerequisites

- **Node.js** v14+ (v16+ recommended)
- **npm** or **yarn**
- **MongoDB Atlas** account with vector search enabled
- **OpenAI API** key with access to embeddings and chat models

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/KIRAN-MISKIN/Q-A_Support_Bot.git
   cd Q-A_Support_Bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB Atlas Vector Index**
   
   Create a vector search index named `vector_index` in your MongoDB Atlas collection with the following configuration:
   ```json
   {
     "fields": [
       {
         "type": "vector",
         "path": "embedding",
         "numDimensions": 1536,
         "similarity": "cosine"
       }
     ]
   }
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=8000
   NODE_ENV=development

   # OpenAI Configuration
   OPEN_API_KEY=your_openai_api_key_here
   
   # LLM Model Settings
   LLM_MODEL=gpt-4-turbo-preview
   LLM_TEMPERATURE=0.7
   LLM_MAX_COMPLETIONTOKEN=500
   EMBEDDING_MODEL=text-embedding-3-small

   # MongoDB Configuration
   DB_URL=mongodb+srv://username:password@cluster.mongodb.net
   DB_NAME=qa_support_bot
   DB_COLLECTION=embeddings

   # ChromaDB Configuration (Optional)
   CHROMA_DB_API_KEY=your_chroma_api_key
   CHROMA_DB_TENANT=default_tenant
   CHROMA_DB_DATABASE=default_database

   # Chunking Configuration
   CHUNCK_SIZE=1000
   CHUNCK_OVERLAP=200

   # RAG Configuration
   SCORE_THRESHOLD=0.7
   RECORD_LIMIT=5
   ```

5. **Start the server**
   
   **Production mode:**
   ```bash
   npm start
   ```
   
   **Development mode (with hot reload):**
   ```bash
   npm run dev
   ```

---

## ⚙️ Configuration

### Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | 8000 | ❌ No |
| `NODE_ENV` | Environment mode | development | ❌ No |
| `OPEN_API_KEY` | OpenAI API key | - | ✅ Yes |
| `LLM_MODEL` | OpenAI model for chat | gpt-4-turbo-preview | ✅ Yes |
| `LLM_TEMPERATURE` | LLM creativity (0-1) | 0.7 | ✅ Yes |
| `LLM_MAX_COMPLETIONTOKEN` | Max tokens in response | 500 | ✅ Yes |
| `EMBEDDING_MODEL` | OpenAI embedding model | text-embedding-3-small | ✅ Yes |
| `DB_URL` | MongoDB connection string | - | ✅ Yes |
| `DB_NAME` | MongoDB database name | - | ✅ Yes |
| `DB_COLLECTION` | Collection for embeddings | embeddings | ✅ Yes |
| `CHUNCK_SIZE` | Text chunk size | 1000 | ✅ Yes |
| `CHUNCK_OVERLAP` | Overlap between chunks | 200 | ✅ Yes |
| `SCORE_THRESHOLD` | Min similarity score | 0.7 | ✅ Yes |
| `RECORD_LIMIT` | Max context chunks | 5 | ✅ Yes |

### Recommended Settings

**For Accuracy (Higher Quality)**:
```env
LLM_MODEL=gpt-4-turbo-preview
LLM_TEMPERATURE=0.3
SCORE_THRESHOLD=0.8
RECORD_LIMIT=3
```

**For Speed (Faster Responses)**:
```env
LLM_MODEL=gpt-3.5-turbo
LLM_TEMPERATURE=0.5
SCORE_THRESHOLD=0.6
RECORD_LIMIT=5
```

---

## 🚀 Usage

### Starting the Bot

```bash
# Production
npm start

# Development with hot reload
npm run dev
```

The server will start on `http://localhost:8000` (or your configured PORT).

### Quick Start Example

1. **Crawl a website:**
   ```bash
   curl --location 'http://localhost:8000/api/crawl' \
   --header 'Content-Type: application/json' \
   --data '{"baseUrl": "https://www.airtribe.live"}'
   ```

2. **Ask a question:**
   ```bash
   curl --location 'http://localhost:8000/api/ask' \
   --header 'Content-Type: application/json' \
   --data '{"query": "What is Airtribe?"}'
   ```

---

## 📚 API Reference

### Base URL
```
http://localhost:8000/api
```

---

### Endpoints

#### Crawl Website

```http
POST /api/crawl
```

Crawls a website, extracts content, generates embeddings, and stores them in the vector database.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `baseUrl` | `string` | **Required**. The website URL to crawl |

**Request Example:**
```bash
curl --location 'http://localhost:8000/api/crawl' \
--header 'Content-Type: application/json' \
--data '{
    "baseUrl": "https://www.airtribe.live"
}'
```

**Response Example (URL Already Exists):**
```json
{
    "status": "success",
    "data": {
        "status": "exists",
        "message": "URL already crawled and exists in DB."
    }
}
```

**Response Example (New URL Crawled Successfully):**
```json
{
    "status": "success",
    "data": {
        "status": "success",
        "message": "Url data stored successfully in DB"
    }
}
```

**Status Codes:**
- `200`: Success (URL exists or crawled successfully)
- `400`: Bad Request (Missing baseUrl)
- `500`: Internal Server Error

---

#### Ask Question

```http
POST /api/ask
```

Ask a question to the bot and receive an AI-generated answer based on crawled content.  Supports conversational context through thread IDs.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `query`   | `string` | **Required**. Question to ask the bot |
| `threadId`| `string` | **Optional**. Thread ID for continuing a conversation |

**Request Example (New Conversation):**
```bash
curl --location 'http://localhost:8000/api/ask' \
--header 'Content-Type: application/json' \
--data '{
    "query": "Does this help me in solving the customer experience"
}'
```

**Request Example (Continue Existing Conversation):**
```bash
curl --location 'http://localhost:8000/api/ask' \
--header 'Content-Type: application/json' \
--data '{
    "query":  "Does this help me in solving the customer experience",
    "threadId": "352148b63f1eefb2fa855f1fa564b17d"
}'
```

**Response Example:**
```json
{
    "status": "success",
    "data": {
        "threadId":  "352148b63f1eefb2fa855f1fa564b17d",
        "response": "I don't have enough information."
    }
}
```

**Response Example (With Context):**
```json
{
    "status": "success",
    "data": {
        "threadId": "352148b63f1eefb2fa855f1fa564b17d",
        "response": "Based on the information from Airtribe, yes, this platform helps improve customer experience by providing upskilling programs that enable professionals to better understand and serve customer needs..."
    }
}
```

**Status Codes:**
- `200`: Success
- `400`: Bad Request (Missing query parameter)
- `500`: Internal Server Error

---

### Helper Functions

#### crawlWebsite(baseUrl)

Crawls a website and extracts all relevant content.

**Parameters:**
- `baseUrl` (string): Base URL of the website to crawl

**Returns:** Promise<Object> - Crawled pages data

---

#### generateEmbedding(text)

Takes text and generates vector embeddings using OpenAI.  

**Parameters:**
- `text` (string): Text to embed

**Returns:** Promise<Array> - Vector embedding array

---

#### processQuery(query, threadId)

Processes user query and generates response using RAG.

**Parameters:**
- `query` (string): User's question
- `threadId` (string|null): Optional thread ID for conversation context

**Returns:** Promise<Object> - Response with threadId and answer

---

## 📁 Project Structure

```
Q-A_Support_Bot/
├── src/
│   ├── config/
│   │   └── index.js                 # Centralized configuration
│   │
│   ├── db/
│   │   ├── db_connection.js         # MongoDB connection setup
│   │   └── models/
│   │       ├── Chat.js              # Conversation schema (threadId + messages)
│   │       └── Embedding.js         # Embedding schema (chunks + vectors)
│   │
│   ├── api/
│   │   ├── router/
│   │   │   └── router.js            # API routes (/crawl, /ask)
│   │   ├── controller/
│   │   │   └── controller.js        # Request handlers
│   │   ├── service. js/
│   │   │   ├── crawl.service.js     # Crawling orchestration
│   │   │   ├── llmPrompts.js        # RAG prompt engineering & LLM invocation
│   │   │   └── vectorSearch.js      # MongoDB vector search aggregation
│   │   └── utils/
│   │       ├── AppError.js          # Custom error class
│   │       ├── generate.js          # Thread ID generator (crypto)
│   │       └── responseHandler.js   # Consistent API responses
│   │
│   ├── crawling/
│   │   └── index.js                 # Web scraping logic (Axios + Cheerio)
│   │
│   ├── chunking/
│   │   └── index.js                 # Text splitting with LangChain
│   │
│   ├── embeddings/
│   │   └── index.js                 # OpenAI embedding generation
│   │
│   ├── vector storage/
│   │   └── mongoDB.js               # Database operations (insert, findUrlExist)
│   │
│   └── agents/
│       └── index. js                 # LLM agent initialization
│
├── index.js                         # Application entry point
├── server.js                        # Express server setup
├── package.json                     # Dependencies and scripts
├── . env                             # Environment variables
├── .gitignore                       # Git ignore rules
├── LICENSE                          # MIT License
└── README.md                        # This file
```

---

## 🔍 How It Works

### 1. Web Crawling Process
- User provides a `baseUrl` to the `/api/crawl` endpoint
- System checks if the URL has already been crawled
- If new, the bot crawls the website using Axios and Cheerio
- Content is extracted and cleaned from all accessible pages

### 2. Embedding Generation
- Extracted content is split into manageable chunks using LangChain text splitters
- Each chunk is converted into vector embeddings using OpenAI's embedding models
- Embeddings are stored in MongoDB Atlas vector database with metadata

### 3. Question Answering (RAG)
- User sends a question via `/api/ask` endpoint
- The query is converted to an embedding
- Vector similarity search retrieves the most relevant document chunks
- Retrieved context is fed to LangChain with the user's question
- AI generates an accurate, context-aware answer
- Response includes a `threadId` for conversation continuity

### 4. Conversational Context
- If `threadId` is provided in subsequent requests, the bot maintains conversation history
- This allows for follow-up questions and contextual dialogue
- Each conversation thread is tracked independently

```mermaid
graph TD
    A[User Request] --> B{Endpoint? }
    B -->|/crawl| C[Check URL in DB]
    C -->|Exists| D[Return Exists Message]
    C -->|New| E[Crawl Website]
    E --> F[Generate Embeddings]
    F --> G[Store in MongoDB Atlas]
    G --> H[Return Success]
    
    B -->|/ask| I[Generate Query Embedding]
    I --> J{ThreadId Exists?}
    J -->|Yes| K[Load Conversation History]
    J -->|No| L[Create New Thread]
    K --> M[Vector Similarity Search]
    L --> M
    M --> N[Retrieve Relevant Context]
    N --> O[LangChain RAG Processing]
    O --> P[Generate Answer]
    P --> Q[Return Response with ThreadId]
```

---

## 🤝 Contributing

Contributions are always welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Write clear, commented code
- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all API endpoints work as expected

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Kirankumar Miskin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...  
```

---

## 👨‍💻 Author

**Kirankumar Miskin**

- GitHub: [@KIRAN-MISKIN](https://github.com/KIRAN-MISKIN)
- Repository: [Q-A_Support_Bot](https://github.com/KIRAN-MISKIN/Q-A_Support_Bot)

---

## 🙏 Acknowledgments

- [LangChain](https://www.langchain.com/) for the powerful RAG framework
- [OpenAI](https://openai.com/) for embeddings and language models
- [MongoDB Atlas](https://www.mongodb.com/atlas) for vector database capabilities
- [ChromaDB](https://www.trychroma.com/) for local vector storage
- All contributors and supporters of this project

---

## 📞 Support

If you have any questions or need help, please: 

- Open an [issue](https://github.com/KIRAN-MISKIN/Q-A_Support_Bot/issues)
- Contact via GitHub

---

## 🔧 Troubleshooting

### Common Issues

**Issue:  "URL already crawled and exists in DB"**
- This is expected behavior when trying to crawl a URL that's already in the database
- The system prevents duplicate crawling to save resources

**Issue: "I don't have enough information"**
- Make sure you've crawled the relevant website first using `/api/crawl`
- Check that your question is related to the crawled content
- Try rephrasing your question

**Issue: Connection errors**
- Verify your MongoDB Atlas connection string is correct
- Check that your OpenAI API key is valid and has sufficient credits
- Ensure the server is running on the correct port

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ by [Kirankumar Miskin](https://github.com/KIRAN-MISKIN)

</div>
