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
    _id: string;
    receiverId?: string;
    message: string; 
    sender: SenderInNotification;
    urgencyLevel: UrgencyLevel;
    subject: SubjectInNotification;
    type: NotificationType;
}
export interface SenderInNotification{
    _id: string;
    first_name?: string;
    last_name?: string;
}
export interface SubjectInNotification{
    _id: string;
    type: SubjectInNotificationType;
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
export enum NotificationType {
    Reminder=1,
    Warning=2,
    Request=3,
    Alert=4
}
export enum SubjectInNotificationType { 
    babysitting = 1,
    loan= 2,
    event= 3,
    community = 4
}
export interface UserInCommunity {
    _id: string;
    first_name: string;
    last_name: string;
    profile_picture_url: string;
}

export enum UsersRolesInCommunity{
    Member = 2,
    Admin = 1,
}

export interface NeighborhoodInCommunity{
    _id: string;
}
