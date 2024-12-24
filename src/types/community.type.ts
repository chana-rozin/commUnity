export interface Community{
    _id: string;
    name: string;
    description: string;
    adminId: string[];
    members: {
        _id: string;
        first_name: string;
        last_name: string;
        profile_picture_url: string;
    }[];
    imageUrl: string;
}

/*
קבוצה:
שם
ID של מנהלים
רשימת ID's של משתתפים


*/