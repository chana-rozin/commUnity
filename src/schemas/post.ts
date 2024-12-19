import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
    creator: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    communitiesIds: [{ type: Schema.Types.ObjectId, ref: 'community', required: true }],
    createdDate: { type: Date, default: Date.now },
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ type: String }],
    comments: [{
        _id: { type: String, required: true },
        creator: { type: Schema.Types.ObjectId, ref: 'user', required: true },
        content: { type: String, required: true },
        createdDate: { type: Date, default: Date.now },
        likedBy: [{ type: String }]
    }],
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'user' }],
})

export default postSchema;