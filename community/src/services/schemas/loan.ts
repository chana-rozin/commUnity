import mongoose from "mongoose";
const { Schema } = mongoose;


const loanSchema = new Schema({
    lenderID: { type: Schema.Types.ObjectId, ref: 'user' },
    borrowerID: { type: Schema.Types.ObjectId, ref: 'user' },
    item: { type: String},
    createdDate: { type: Date },
    LoanDate: { type: Date},
    active: { type: Boolean },
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

export default loanSchema;