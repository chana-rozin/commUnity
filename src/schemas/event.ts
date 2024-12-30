import mongoose from "mongoose";
const { Schema } = mongoose;
const eventSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String , required: true },
    createdDate: { type: Date ,default: Date.now},
    active: { type: Boolean, required: true},
    AuthorizedIds: [{
        type: Schema.Types.ObjectId,
        refPath: 'authorizedType',  // This field will determine the collection
        required: true  // This field will determine the collection
    }],
    authorizedType: {
        type: String,
        enum: ['community', 'neighborhood'],
        required: true
    },
})

export default eventSchema;