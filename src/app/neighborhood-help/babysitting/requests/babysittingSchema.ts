import { z } from "zod";
import { Address } from "@/types/general.type"; // Assuming Address is exported from user types

const babysittingSchema = z.object({
    requester: z.object({
        id: z.string(),
        name: z.string()
    }),
    date: z.date(),
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
    childrenNumber: z.number().min(1, "Must have at least one child"),
    ageRange: z.string(),
    notes: z.string().optional(), // Optional for additional comments
    AuthorizedIds: z.array(z.string()).optional() // Optional for authorized users
});

export default babysittingSchema;
