import { User } from '@/types/user.type';

const sampleUser: User = {
    _id: "647f5c2d8937461a8c3d9123",
    first_name: "יצחק",
    last_name: "כהן",
    email: "yitzchak.cohen@example.com",
    address: {
        street: "רחוב הרב קוק",
        city: "ירושלים",
        houseNumber: 18,
    },
    phone_number: "+972-54-555-1234",
    age: 34,
    profile_picture_url: "https://files.cdn-files-a.com/uploads/9930870/2000_672d34c1be9c6.jpg",
    neighborhoodId: "",
    communitiesIds: [],
    preferences: {
        email_notifications: true,
        minyan_notifications: true,
        event_notifications: true,
    },
    savedPostsIds: [],
};

export default sampleUser;
