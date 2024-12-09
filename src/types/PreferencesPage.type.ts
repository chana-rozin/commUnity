import { Preference } from "@/types/general.type";

export interface NotificationPreference {
    title: string;
    description: string;
    fieldName: keyof Preference;  // This makes sure fieldName is a key of the Preference type
    isEnabled: boolean;
}


export interface PreferenceSection {
    title: string;
    description: string;
    preferences: NotificationPreference[];
}