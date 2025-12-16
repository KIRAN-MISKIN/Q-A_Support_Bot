import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'assistant', 'system'],
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { _id: false })

const conversationSchema = mongoose.Schema({
    threadId: {
        type: String,
        required: true,
        unique: true
    },
    messages: {
        type: [messageSchema],
        default: []
    }
}, { timestamps: true })

export default mongoose.model("Conversation", conversationSchema)
