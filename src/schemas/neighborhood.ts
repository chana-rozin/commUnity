import mongoose from "mongoose";
const { Schema } = mongoose;

const neighborhoodSchema = new Schema({
    name: { type: String, required: true },
    city: { type: String , required: true },
    country: { type: String, required: true},
    streets: [{ type: String}],
})
neighborhoodSchema.index({ name: 1, city: 1, country: 1 }, { unique: true });
export default neighborhoodSchema;