export interface Address {
    neighborhood: string,
    street: string;
    city: string;
    houseNumber: string;
}

export interface Preference {
    email_notifications: boolean;
    minyan_notifications: boolean;
    event_notifications: boolean;
    sound_alerts: boolean;
    ai_training_data: boolean;
    general_usage_data: boolean;
}

export interface Location {
    type: string;
    coordinates: [number, number];
}

export interface Comment {
    _id: string;
    creator: Creator;
    content: string;
    createdDate: Date;
    likedBy: string[];
}

export interface Notifications {
    message: string;
    receiverId: string;
    sendeId: string;
    urgencyLevel: UrgencyLevel;
}

export interface Creator{
    _id: string;
    profile_picture_url?: string;
    first_name?: string;
    last_name?: string;
}
export interface NeighborhoodInUser{
    _id: string;
    name?: string;
}
export interface CommunityInUser{
    _id: string;
    name?: string;
}
export interface UserInLoan{
    _id: string;
    first_name: string;
    last_name: string;
    address: Address;
    profile_picture_url: string;
}
/*
תגובה:
ID מפרסם
שעת פרסום
גוף
ID’s של לייקים
*/
export enum UrgencyLevel {
    Low = 1,
    Medium = 2,
    High = 3
}

export enum PrayerTime {
    Shacharit = 'שחרית',
    Mincha = 'מנחה',
    Arvit = 'ערבית'
}
