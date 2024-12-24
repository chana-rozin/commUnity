import { UserInCommunity } from "./general.type";
export interface Community{
    _id: string;
    name: string;
    description: string;
    adminId: string[];
    members: UserInCommunity[]
    imageUrl: string;
}

/*
קבוצה:
שם
ID של מנהלים
רשימת ID's של משתתפים


*/