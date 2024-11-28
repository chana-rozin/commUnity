import mongoose from "mongoose";
const { Schema } = mongoose;

const adSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    createdDate: { type: Date },
    expirationDate: { type: Date },

    // This field will reference either 'Community' or 'Neighborhood'
    AuthorizedIds: [{
        type: Schema.Types.ObjectId,
        refPath: 'authorizedType',  // This field will determine the collection
    }],

    // This field will store the name of the collection ('Community' or 'Neighborhood')
    authorizedType: {
        type: String,
        enum: ['community', 'neighborhood'],  // Enforce values to either 'Community' or 'Neighborhood'
    },
});

export default  adSchema;