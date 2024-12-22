import mongoose from "mongoose";
const { Schema } = mongoose;
import { Document } from 'mongoose';
import { Address } from "@/types/general.type";
import { time } from "console";
import { object } from "zod";

const babysittingSchema = new Schema({
    requester: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    babysitter: { type: Schema.Types.ObjectId, ref: 'user' },
    date: { type: Date, required: true },
    address: {
        type: {
            neighborhood: { type: String, required: true },
            street: { type: String, required: true },
            city: { type: String, required: true },
            houseNumber: { type: String, required: true },
        },
        required: true
    },
    time: {
        start: {
            type: String,
            required: true,
            validate: {
                validator: function (value: string) {
                    // Matches "HH:MM" where HH is 00-23 and MM is 00-59
                    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
                },
                message: (props: { value: string }) => `${props.value} is not a valid time. Expected format: 'HH:MM'`,
            }
        },
        end: {
            type: String,
            required: true,
            validate: {
                validator: function (value: string) {
                    // Same regex as above
                    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
                },
                message: (props: { value: string }) => `${props.value} is not a valid time. Expected format: 'HH:MM'`,
            }
        }
    },
    childrenNumber: { type: Number, required: true },
    ageRange: {
        type: String,
        required: true,
        validate: {
            validator: function (value: string) {
                // Matches either "NaN-NaN" or "NaN" format
                return /^[0-9]+(-[0-9]+)?$/.test(value);
            },
            message: (props: { value: string }) => `${props.value} is not a valid age range. Expected format: 'NaN-NaN' or 'NaN'`,
        }
    },
    AuthorizedIds: [{
        type: Schema.Types.ObjectId,
        refPath: 'authorizedType',  // This field will determine the collection
        required: true
    }],
    authorizedType: {
        type: String,
        enum: ['community', 'neighborhood'],  // Enforce values to either 'community' or 'neighborhood'
    },
    notes: { type: String },
})

export default babysittingSchema;