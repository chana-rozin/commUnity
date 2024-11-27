import { Address, Preference, Image } from './general.type'
export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    address: Address;
    phone_number: string;
    age: number;
    profile_picture_url: Image;
    neighborhoodId: string;
    groupsId: string[];
    preferences: Preference
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