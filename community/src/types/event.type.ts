export interface Event {
    id: string;
    name: string;
    description: string;
    date: Date;
    location: string;
    createdDate: Date;
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