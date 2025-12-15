import Conversation from '../../db/models/Chat.js';

const conversationHistory = async (threadId, userQuery, llmResponse) => {
  return Conversation.findOneAndUpdate(
    { threadId },
    {
      $push: {
        messages: {
          $each: [
            { role: 'user', content: userQuery },
            { role: 'assistant', content: llmResponse },
          ],
          $slice: -50
        },
      },
    },
    {
      new: true,
      upsert: true,
    }
  );
};

const llmChatHistory = async (threadId) => {
  const result = await Conversation.findOne({ threadId });

  if (!result || !result.messages || result.messages.length === 0) {
    return [];
  }

  // Return structured messages (BEST)
  return result.messages.slice(-4);
};

export default { conversationHistory, llmChatHistory };
