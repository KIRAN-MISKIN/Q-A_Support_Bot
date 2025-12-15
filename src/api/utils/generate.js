import crypto from 'crypto'

const generateThreadId = async () => {
    const threadId = crypto.randomBytes(16).toString("hex");
    return threadId;
}

export default generateThreadId