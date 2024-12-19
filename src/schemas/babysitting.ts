import mongoose from "mongoose";
const { Schema } = mongoose;
import { Document } from 'mongoose';

const babysittingSchema = new Schema({
    requesterId: { type: Schema.Types.ObjectId,  ref: 'user' ,   required: true},
    babysitterId: { type: Schema.Types.ObjectId, ref: 'user' },
    date: { type: Date ,   required: true },
    location: { type: String ,   required: true},
    childrenNumber: { type: Number ,  required: true},
    ages: [{ type: Number,   required: true}],
    AuthorizedIds: [{
        type: Schema.Types.ObjectId,
        refPath: 'authorizedType',  // This field will determine the collection
        required: true
    }],
    authorizedType: {
        type: String,
        enum: ['community', 'neighborhood'],  // Enforce values to either 'community' or 'neighborhood'
    },
})

export default  babysittingSchema;