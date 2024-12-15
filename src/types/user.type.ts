import { Address, Preference } from './general.type'
export interface User {
    _id?: string;
    first_name: string;
    last_name: string;
    email: string;
    address: Address;
    phone_number: string;
    age?: number;
    profile_picture_url: string;
    neighborhoodId: string;
    communitiesIds: string[];
    preferences: Preference;
    savedPostsIds: string[];
    savedEventsIds: string[];

}
/*
משתמש:
שם פרטי
שם משפחה
כתובת מייל
כתובת פיזית
פלאפון
גיל?
תמונת פרופיל?
שכונה
קבוצות שאליהן הוא משויך
העדפות (אוביקט שמכיל: תזכרות למייל, קבלת התראות על מניינים, קבלת התראות על אירועים)

*/ 