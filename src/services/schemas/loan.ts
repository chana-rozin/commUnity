import mongoose from "mongoose";
const { Schema } = mongoose;


const loanSchema = new Schema({
    lenderId: { type: Schema.Types.ObjectId, ref: 'user', default: null }, // Allow ObjectId or null
    borrowerId: { type: Schema.Types.ObjectId, ref: 'user' },
    item: { type: String },
    createdDate: { type: Date },
    LoanDate: { type: Date },
    active: { type: Boolean },
    AuthorizedIds: [{
        type: Schema.Types.ObjectId,
        refPath: 'authorizedType',  // This field will determine the collection
    }],
    authorizedType: {
        type: String,
        enum: ['community', 'neighborhood'],  // Enforce values to either 'community' or 'neighborhood'
    },
});

export default loanSchema;