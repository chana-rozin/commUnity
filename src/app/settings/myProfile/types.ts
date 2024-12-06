import { z } from "zod";

export const profileSchema = z.object({
    firstName: z.string().min(2, "שם פרטי חייב להכיל לפחות 2 תווים"),
    lastName: z.string().min(2, "שם משפחה חייב להכיל לפחות 2 תווים"),
    email: z.string().email("כתובת אימייל לא תקינה"),
    phone: z.string().regex(/^[0-9+\-\s]+$/, "מספר טלפון לא תקין"),
    address: z.object({
        street: z.string().min(5, "רחוב חייב להכיל לפחות 5 תווים"),
        city: z.string().min(2, "עיר חייבת להכיל לפחות 2 תווים"),
        houseNumber: z.union([
            z.string().min(1, "מספר בית חייב להכיל לפחות 1 תו"),
            z.number().min(1, "מספר בית חייב להיות מספר חיובי")
        ])
    })
});

export type ProfileFormData = z.infer<typeof profileSchema>;


import { UseFormRegister } from "react-hook-form";
// Utility type to get all keys, including nested ones
type NestedKeys<T> = T extends object
    ? { [K in keyof T]: `${K & string}` | `${K & string}.${NestedKeys<T[K]>}` }[keyof T]
    : never;

export interface ProfileFieldProps {
    name: NestedKeys<ProfileFormData>; // This now allows nested keys like "address.street"
    label: string;
    iconSrc: string;
    register: UseFormRegister<ProfileFormData>;
    error?: string;
}

export interface ProfileSectionProps {
    title: string;
    description: string;
    children: React.ReactNode;
}