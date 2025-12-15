import mongoose from "mongoose";

const embeddingSchema = new mongoose.Schema(
    {
        chunkId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        parentUrl: {
            type: String,
            required: true,
            index: true
        },

        pageTitle: {
            type: String
        },

        chunkText: {
            type: String,
            required: true
        },

        embedding: {
            type: [Number],
            required: true
        }
    },
    { timestamps: true }
);

export const Embedding = mongoose.model("Embedding", embeddingSchema);
