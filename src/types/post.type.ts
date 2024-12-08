import { ImageFile, Comment } from './general.type'
export interface Post{
    _id: string;
    creatorId: string;
    communitiesIds: string[];
    createdDate: Date;
    title: string;
    content: string;
    images: string[];
    comments: Comment[];
    likedBy: string[];
}

/*
פוסט:
ID מפרסם
ID קבוצה
שעת פרסום
כותרת
גוף
קבצים מצורפים
ID’s של תגובות
ID’s של לייקים

*/