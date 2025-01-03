export interface Event {
    _id: string;
    name: string;
    description: string;
    date: Date;  
    location: string;
    createdDate: Date;  
    active: boolean;
    AuthorizedIds: string[];
    authorizedType: 'community' | 'neighborhood';
}

/*
אירוע:
שם
תיאור
תאריך
תאריך פרסום
פעיל
הרשאות צפייה- רשימת תזים של קבוצות שיכולות לצפות באירוע
מיקום

*/