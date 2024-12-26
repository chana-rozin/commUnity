import { z } from "zod";

export const CommunityForm = z
    .object({
        name: z.string().min(2,{ message: 'שם הקהילה צריך להיות לפחות 2 אותיות' }).trim(),
        description: z.string().min(2,{ message: 'תיאור הקהילה צריך להיות לפחות 2 אותיות' }).trim(),
    })

export type CommunityFormSchema = z.infer<typeof CommunityForm>;


