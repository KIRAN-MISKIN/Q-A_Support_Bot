import crypto from 'crypto'

const generateThreadId = () => {
    const threadId = crypto.randomBytes(16).toString("hex");
    return threadId;
}

export default generateThreadId
