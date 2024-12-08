import { NextResponse } from "next/server";
import { insertDocument } from "@/services/mongodb";
import { generateToken } from '@/services/tokens';
import { auth } from '@/services/firebaseAdmin';

// Create a new post
export async function POST(request: Request) {
    try {
        const body = await request.json(); // Parse request body
        const { accessToken, email, communitiesIds, neighborhoodId } = body;

        // Verify the token with Firebase
        const decodedToken = await auth.verifyIdToken(accessToken);
        console.log('Decoded token:', decodedToken);

        delete body.accessToken;
        // Insert into the database
        const result = await insertDocument("users", body);
        if (!result) {
            return NextResponse.json(
                { message: "Failed to create user" },
                { status: 500 }
            );
        }

        const id = result.insertedId.toString();
        
        // Generate token
        const token = generateToken(id, communitiesIds, neighborhoodId);

        // Respond with token in httpOnly cookie
        const response = NextResponse.json(
            { insertedId: id },
            { status: 201 },
        );

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 // 1 week in seconds
        });

        return response;
    } catch (error: any) {
        console.error('Error in POST handler:', error);
        return NextResponse.json(
            { message: "Invalid token or other error occurred", error: error.message },
            { status: 401 }
        );
    }
}
