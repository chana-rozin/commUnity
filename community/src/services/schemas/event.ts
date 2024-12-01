import mongoose from "mongoose";
const { Schema } = mongoose;
const eventSchema = new Schema({
    creatorId: { type: mongoose.Types.ObjectId, required: true },
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

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
export default Event;