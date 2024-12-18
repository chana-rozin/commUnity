import mongoose from "mongoose";
const { Schema } = mongoose;
import { PrayerTime } from '@/types/general.type'

const minyanSchema = new Schema({
    location: { type: String, required: true },
    time: { type: String, required: true },
    AuthorizedIds: [{
        type: Schema.Types.ObjectId,
        refPath: 'authorizedType',  // This field will determine the collection
    }],

    // This field will store the name of the collection ('Community' or 'Neighborhood')
    authorizedType: {
        type: String,
        enum: ['community', 'neighborhood'],  // Enforce values to either 'Community' or 'Neighborhood'
    },
    membersCount: { type: Number },
    isRegular: { type: Boolean, required: true },
    category: {
        type: String,
        enum: Object.values(PrayerTime),  // Use enum values dynamically
        required: true
    }
})

export default minyanSchema;