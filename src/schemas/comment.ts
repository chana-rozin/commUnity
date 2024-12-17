import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
    _id: { type: String, required: true },
    creatorId: { type: String, required: true },
    content: { type: String, required: true },
    createdDate: { type: Date, required: true },
    likedBy: [{ type: String }]
});

export default commentSchema;
