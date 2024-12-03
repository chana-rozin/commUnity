import mongoose from "mongoose";

const { Schema } = mongoose;

const verifyEmailSchema = new mongoose.Schema({
    email: { type: String, required: true },
    verificationHash: { type: String, required: true },
});

export default verifyEmailSchema;
