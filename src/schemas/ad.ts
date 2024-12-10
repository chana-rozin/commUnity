import mongoose from "mongoose";

const { Schema } = mongoose;

const adSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    expirationDate: { type: Date, required: true },
    AuthorizedIds: [
        {
            type: Schema.Types.ObjectId,
            refPath: "authorizedType", // Determines the collection to reference
        },
    ],
    authorizedType: {
        type: String,
        enum: ["community", "neighborhood"], // Enforces specific values
        required: true,
    },
});

export default adSchema;