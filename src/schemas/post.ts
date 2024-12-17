import mongoose from "mongoose";
const { Schema } = mongoose;
import commentSchema from './comment'
const postSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    communitiesIds: { type: [Schema.Types.ObjectId], ref: 'community', required: true},
    createdDate: { type: Date, default: Date.now },
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [{type: String}],
    comments: [commentSchema],
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'user' }],
})

export default postSchema;