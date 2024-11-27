import { ImageFile, Comment } from './general.type'
export interface Post{
    id: string;
    creatorId: string;
    communityId: string;
    createdDate: Date;
    title: string;
    content: string;
    images: ImageFile[];
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