import mongoose from "mongoose";
const { Schema } = mongoose;

const babysittingSchema = new Schema({
    requesterId: { type: Schema.Types.ObjectId,  ref: 'user' },
    babysitterId: { type: Schema.Types.ObjectId, ref: 'user' },
    date: { type: Date },
    location: { type: String },
    childrenNumber: { type: Number},
    ages: [{ type: Number}],
    AuthorizedIds: [{
        type: Schema.Types.ObjectId,
        refPath: 'authorizedType',  // This field will determine the collection
    }],

    // This field will store the name of the collection ('Community' or 'Neighborhood')
    authorizedType: {
        type: String,
        enum: ['community', 'neighborhood'],  // Enforce values to either 'Community' or 'Neighborhood'
    },
})

export default  babysittingSchema;