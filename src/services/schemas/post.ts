import mongoose from "mongoose";
const { Schema } = mongoose;
const postSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: 'user' },
    communityId: { type: Schema.Types.ObjectId, ref: 'community' },
    createdDate: { type: Date },
    title: { type: String},
    content: { type: String },
    images: [{
        type: {
            _id: { type: String },
            url: { type: String },
        }
    }],
    comments: [{ type: String }],
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'user' }],
})

export default postSchema;