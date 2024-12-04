import { User } from "@/types/user.type";

const sampleUser:User = {
    _id: "645c1ab8e8f1a7a1b5c8d9f1",
    first_name: "ישראל",
    last_name: "כהן",
    email: "israel.cohen@example.com",
    address: {
        street: "הרצל",
        city: "ירושלים",
        houseNumber: "10",
    },
    phone_number: "052-1234567",
    age: 30,
    profile_picture_url: "https://example.com/profile-pictures/israel-cohen.jpg",
    neighborhoodId: "645c1ab8e8f1a7a1b5c8d9f2", // Example neighborhood ID
    communitiesIds: [
        "645c1ab8e8f1a7a1b5c8d9f3",
        "645c1ab8e8f1a7a1b5c8d9f4",
    ], // Example community IDs
    preferences: {
        email_notifications: true,
        minyan_notifications: false,
        event_notifications: true,
    },
    savedPostsIds: ["645c1ab8e8f1a7a1b5c8d9f5", "645c1ab8e8f1a7a1b5c8d9f6"], // Example post IDs
};

import http from "@/services/http";

const getSampleUser = async ()=>{
    const res = await http.get("/users/674ed9fb04a9dba04cdfaea7");
    return res.data as User;
}


export { sampleUser, getSampleUser};