import mongoose from "mongoose";
const { Schema } = mongoose;


const loanSchema = new Schema({
    lender: { type: Schema.Types.ObjectId, ref: 'user', default: null }, // Allow ObjectId or null
    borrower: { type: Schema.Types.ObjectId, ref: 'user' , required: true },
    item: { type: String, required: true },
    createdDate: { type: Date, required: true, default: Date.now },
    LoanDate: { type: Date },
    active: { type: Boolean, required: true },
    AuthorizedIds: [{
        type: Schema.Types.ObjectId,
        refPath: 'authorizedType', 
        required: true
    }],
    authorizedType: {
        type: String,
        enum: ['community', 'neighborhood'],  // Enforce values to either 'community' or 'neighborhood'
    },
});

export default loanSchema;