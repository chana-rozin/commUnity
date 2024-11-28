import mongoose from "mongoose";
const { Schema } = mongoose;
const eventSchema = new Schema({
    name: { type: String },
    description: { type: String },
    date: { type: Date },
    location: { type: String },
    createdDate: { type: Date },
    active: { type: Boolean},
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

export default eventSchema;