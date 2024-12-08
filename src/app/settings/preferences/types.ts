export interface NotificationPreference {
    title: string;
    description: string;
    isEnabled: boolean;
}

export interface PreferenceSection {
    title: string;
    description: string;
    preferences: NotificationPreference[];
}