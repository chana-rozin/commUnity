export interface Event {
    _id: string;
    name: string;
    description: string;
    date: string;
    location: string;
    createdDate: string;
    active: boolean;
    AuthorizedIds: string[]; 
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