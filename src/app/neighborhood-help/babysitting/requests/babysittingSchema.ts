import { z } from "zod";
import { Address } from "@/types/general.type"; // Assuming Address is exported from user types

const babysittingSchema = z.object({
    requester: z.object({
        id: z.string(),
        name: z.string()
    }),
    date: z
        .string() // Input is a string from `<input type="date">`
        .transform((value) => new Date(value)) // Convert to Date object
        .refine((date) => !isNaN(date.getTime()), "Invalid date"), // Check if valid Date
    time: z.object({
        start: z.string(), // Format like "HH:mm"
        end: z.string() // Format like "HH:mm"
    }),
    address: z.object({
        neighborhood: z.string(),
        street: z.string(),
        city: z.string(),
        houseNumber: z.string()
    }),
    childrenNumber: z
    .string() // Input is a string from `<input type="number">`
    .transform((value) => parseInt(value, 10)) // Convert to a number
    .refine((value) => !isNaN(value) && value > 0, "Must be a valid positive number"),
    ageRange: z.string(),
    notes: z.string().optional(), // Optional for additional comments
    AuthorizedIds: z.array(z.string()).optional() // Optional for authorized users
});

export default babysittingSchema;
