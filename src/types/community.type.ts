import { UserInCommunity, NeighborhoodInCommunity } from "./general.type";
export interface Community{
    _id?: string;
    main: Boolean;
    neighborhood: NeighborhoodInCommunity;
    name: string;
    description: string;
    members: UserInCommunity[]
    imageUrl: string;
}

/*
קבוצה:
שם
ID של מנהלים
רשימת ID's של משתתפים


*/