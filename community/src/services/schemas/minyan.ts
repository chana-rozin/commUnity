import mongoose from "mongoose";
const { Schema } = mongoose;
import { PrayerTime } from '@/types/general.type'

const minyanSchema = new Schema(
    {
        category: { type: String},
        location: { type: String },
        time: { type: String },
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
        isRegular: { type: Boolean },
         // This field will store the name of the collection ('Community' or 'Neighborhood')
    }
)

export default minyanSchema;