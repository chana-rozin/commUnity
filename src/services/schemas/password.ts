import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
const { Schema } = mongoose;

const passwordSchema = new Schema({
    email: { type: String , unique: true , required: true },
    password: { type: String , required: true },
})

export default passwordSchema;