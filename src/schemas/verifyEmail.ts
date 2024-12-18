import mongoose from "mongoose";
const expireAfterSeconds = 30;

const verifyEmailSchema = new mongoose.Schema({
    email: { type: String, required: true },
    verificationHash: { type: String, required: true },
    createdAt: { type: Date, required: true , default: Date.now}
});

verifyEmailSchema.index(
    { createdAt: 1 },
    { expireAfterSeconds: expireAfterSeconds }
);

export default verifyEmailSchema;
