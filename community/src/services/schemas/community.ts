import mongoose from "mongoose";
const { Schema } = mongoose;

const communitySchema = new Schema({
    name: { type: String },
    adminId: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    membersId: [{ type: Schema.Types.ObjectId, ref: 'user' }]
})

export default communitySchema;