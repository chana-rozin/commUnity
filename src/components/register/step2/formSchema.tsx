import { z } from "zod";

export const formTypes = z.object({
    firstName: z.string().min(2, { message: 'שם פרטי נדרש' }),
    lastName: z.string().min(2, { message: 'שם משפחה נדרש' }),
    address: z.string().min(2, { message: 'כתובת מגורים נדרשת' }),
    phone: z.string().min(9, { message: 'מס\' פלאפון לא תקני' }), // Adjust the regex as needed
});

export type formSchema = z.infer<typeof formTypes>;
