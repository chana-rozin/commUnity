import mongoose from "mongoose";
const { Schema } = mongoose;

const adSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    expirationDate: { type: String, required: true },
    AuthorizedIds: [{type: Schema.Types.ObjectId, refPath: 'authorizedType', required: true}],
    authorizedType: {
        type: String,
        enum: ['community', 'neighborhood'],  // Enforce values to either 'community' or 'neighborhood'
    },
});

export default adSchema;