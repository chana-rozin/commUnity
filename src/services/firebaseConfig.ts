// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDPj-tZTH6Ix4cmOPGxrcaQG9289u8Y_ko",
    authDomain: "community-f024e.firebaseapp.com",
    projectId: "community-f024e",
    storageBucket: "community-f024e.firebasestorage.app",
    messagingSenderId: "293696543593",
    appId: "1:293696543593:web:1228cb02ffe27560903bf8",
    measurementId: "G-0VLR8B27JW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
