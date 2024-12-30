import mongoose from "mongoose";
const { Schema } = mongoose;

const communitySchema = new Schema({
    main: { type: Boolean, required: true },
    neighborhood: { type: Schema.Types.ObjectId, ref: "neighborhood", required: true},
    name: { type: String, required: true },
    description : { type: String, required: true },
    members: [{type: Schema.Types.ObjectId, ref: 'user'}],
    imageUrl: { type: String, required: true}
})

export default communitySchema;