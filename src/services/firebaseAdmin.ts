import admin from 'firebase-admin';

if (!admin.apps.length) {
    console.log(process.env.FIREBASE_PROJECT_ID);
    
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
        }),
    });
}

export const auth = admin.auth();