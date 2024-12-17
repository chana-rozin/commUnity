import mongoose from "mongoose";
import { UrgencyLevel } from "@/types/general.type";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, require: true }, // Ensure emails are unique
    address: {
        neighborhood: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        houseNumber: { type: String, required: true },
    },
    phone_number: { type: String, required: true },
    age: { type: Number, required: true },
    profile_picture_url: { type: String, required: true },
    neighborhoodId: { type: Schema.Types.ObjectId, ref: 'neighborhood' },
    communitiesIds: [{ type: Schema.Types.ObjectId, ref: 'community' }],
    savedPostsIds: [{ type: Schema.Types.ObjectId, ref: 'post' }],
    savedEventsIds: [{ type: Schema.Types.ObjectId, ref: 'events' }],
    preferences: {
        type: {
            email_notifications: { type: Boolean, default: false },
            minyan_notifications: { type: Boolean, default: false },
            event_notifications: { type: Boolean, default: false },
        },
    },
    notification: {
        type: {
            message: { type: String, required: true },
            receiverId: { type: Schema.Types.ObjectId, required: true },
            sendeId: { type: Schema.Types.ObjectId, required: true },
            urgencyLevel: {
                type: String,
                enum: Object.values(UrgencyLevel),  // Use enum values dynamically
                required: true
            }
        }
    }
});

export default userSchema;