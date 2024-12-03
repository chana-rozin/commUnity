// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWZrxi191z-RmDUwoejs6c2ddP6UVB-sA",
    authDomain: "auth-test-a11e4.firebaseapp.com",
    projectId: "auth-test-a11e4",
    storageBucket: "auth-test-a11e4.firebasestorage.app",
    messagingSenderId: "923221211803",
    appId: "1:923221211803:web:3257379bdceb997e6d243e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
