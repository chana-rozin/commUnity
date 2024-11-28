import mongoose from "mongoose";
const { Schema } = mongoose;

const neighborhoodSchema = new Schema({
    name: { type: String},
    city: { type: String },
    streets: [{ type: String}],
    membersId: [{ type: Schema.Types.ObjectId, ref: 'user' }]
})

export default neighborhoodSchema;