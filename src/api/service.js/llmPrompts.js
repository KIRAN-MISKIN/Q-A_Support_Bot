import agents from "../../agents/index.js";
import config from "../../config/index.js";

const chatLLM = async (historyString, userQuery, ragData) => {

    if (!historyString) {
        historyString = [];
    }
    if (!userQuery) {
        userQuery = "";
    }
    if (!ragData) {
        ragData = [];
    }

    const contextChunks = ragData
        .sort((a, b) => b.score - a.score)
        .filter(item => item.score >= Number(config.SCORE_THRESHOLD))
        .slice(0, Number(config.RECORD_LIMIT));

    const contextText = contextChunks
        .map((item, i) => `[${i + 1}] ${item.chunkText}`)
        .join('\n');

    const systemPrompt = `
You are a helpful AI assistant.
Answer using ONLY the context.
Keep the answer short and meaningful (2–3 sentences).
If unsure, say you don’t have enough information.

context: ${contextText}
`;

    const messages = [
        { role: "system", content: systemPrompt },
        ...historyString,
        {
            role: "user",
            content: `Question: ${userQuery}`
        }
    ];
    const response = await agents.llm.invoke(messages);

    return response.content;
};

export default { chatLLM };
