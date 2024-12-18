export interface Ad{
    _id: string;
    name: string;
    description: string;
    createdDate: string;
    expirationDate: string;
    AuthorizedIds: string[];
}

/*
מודעה:
שם
תיאור
תאריך פרסום
תאריך תפוגה
הרשאות צפייה- רשימת תזים של קבוצות שיכולות לצפות באירוע

*/