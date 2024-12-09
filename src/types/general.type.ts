export interface Address {
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


export interface Comment {
    _id: string;
    creatorId: string;
    content: string;
    createdDate: Date;
    likedBy: string[];
}
/*
תגובה:
ID מפרסם
שעת פרסום
גוף
ID’s של לייקים
*/

export interface FileInfo {
    id: string;        // מזהה ייחודי לקובץ
    name: string;      // שם הקובץ
    size: number;      // גודל הקובץ בבתים
    type: string;      // סוג הקובץ (MIME type)
    uploadedAt: Date;  // תאריך ושעה של ההעלאה
    url: string;       // קישור לגישה לקובץ
}

// הרחבה לתמונות
export interface ImageFile extends FileInfo {
    width: number;     // רוחב התמונה בפיקסלים
    height: number;    // גובה התמונה בפיקסלים
    altText?: string;  // טקסט אלטרנטיבי לתמונה
}

// הרחבה לסרטונים
export interface VideoFile extends FileInfo {
    duration: number;  // משך הסרטון בשניות
    resolution: string; // רזולוציית הסרטון (למשל "1920x1080")
    thumbnailUrl?: string; // קישור לתמונה ממוזערת של הסרטון
}

export enum PrayerTime {
    Shacharit = 'שחרית', 
    Mincha = 'מנחה',       
    Arvit = 'ערבית'        
}
