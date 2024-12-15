import { z } from "zod";

export const formTypes = z.object({
    firstName: z.string().min(2, { message: 'שם פרטי נדרש' }),
    lastName: z.string().min(2, { message: 'שם משפחה נדרש' }),
    // lon: z.number(),
    // lat: z.number(),
    // city: z.string().min(2, { message: 'נא להכניס את שם העיר' }),
    // street: z.string().min(2, { message: 'נא להכניס את שם הרחוב' }),
    // houseNumber: z
    //     .string()
    //     .min(1, { message: 'נא להכניס מספר בית/בניין' })
    //     .regex(/^\s*\d+\s*$/, { message: 'מספר הבית חייב להיות מורכב רק מספרות (ניתן להוסיף רווחים מסביב)' }),
    phone: z
        .string()
        .min(9, { message: 'מס\' פלאפון לא תקני' }) // אפשר לעדכן את ה-Regex לפי הצורך
});


export type formSchema = z.infer<typeof formTypes>;
