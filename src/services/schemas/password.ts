import mongoose from "mongoose";
const { Schema } = mongoose;

const passwordSchema = new Schema({
    email: { type: String},
    password: { type: String }
})

export default passwordSchema;