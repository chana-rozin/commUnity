import { PrayerTime } from './general.type'
export interface Minyan{
    id: string;
    category: PrayerTime;
    location: string;
    time: string;
    AuthorizedIds: string[];
    membersCount: number;
    isRegular: boolean; 
}

/*
מניינים:
קטגוריה (ENUM עם אופציות שחרית מנחה וערבית)
מיקום
זמן
הרשאות צפייה- רשימת תזים של קבוצות שיכולות לצפות באירוע
מס' משתתפים
קבוע (בוליאני)

*/