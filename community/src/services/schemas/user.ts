import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    first_name: { type: String},
    last_name: { type: String},
    email: { type: String, unique: true }, // Ensure emails are unique
    address: {
        street: { type: String },
        city: { type: String },
        houseNumber: { type: String },
    },
    phone_number: { type: String},
    age: { type: Number },
    profile_picture_url: {
        _id: { type: String },
        url: { type: String },
    },
    neighborhoodId: [{ type: Schema.Types.ObjectId, ref: 'neighborhood' }],
    communitiesIds: [{ type: Schema.Types.ObjectId, ref: 'community' }],
    preferences: {
        type: {
            email_notifications: { type: Boolean, default: false },
            minyan_notifications: { type: Boolean, default: false },
            event_notifications: { type: Boolean, default: false },
        },
    }
});

export default  userSchema;