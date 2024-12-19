import mongoose from "mongoose";
import { UrgencyLevel, NotificationType } from "@/types/general.type";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, require: true }, // Ensure emails are unique
    location: {
        type:  { type: String, required: true},
        coordinates: { type: [{type:Number,required:true}], index: '2dsphere' }, // 2D Geospatial Indexing
    },
    address: {
        neighborhood: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        houseNumber: { type: String, required: true },
    },
    phone_number: { type: String, required: true },
    age: { type: Number },
    profile_picture_url: { type: String, required: true },
    neighborhood: { type: Schema.Types.ObjectId, ref: 'neighborhood' },
    communities: [{ type: Schema.Types.ObjectId, ref: 'community' }],
    savedPostsIds: [{ type: Schema.Types.ObjectId, ref: 'post' }],
    savedEventsIds: [{ type: Schema.Types.ObjectId, ref: 'event' }],
    preferences: {
        type: {
            email_notifications: { type: Boolean, default: false },
            minyan_notifications: { type: Boolean, default: false },
            event_notifications: { type: Boolean, default: false },
        },
    },
    notifications: [{
        type: {
            _id: { type: String, required: true },
            message: { type: String, required: true },
            sender: { type: Schema.Types.ObjectId, required: true },
            urgencyLevel: {
                type: Number,
                enum: Object.values(UrgencyLevel),  // Use enum values dynamically
                required: true,
                default: UrgencyLevel.Low
            },
            type: {
                type: String,
                enum: Object.values(NotificationType),
                required: true,
                default: UrgencyLevel.Low
            },
            subject: { type: Schema.Types.ObjectId }
        },
    }]
});

export default userSchema;