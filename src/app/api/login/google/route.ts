import { NextResponse } from "next/server";
import { getDocumentByQuery } from "@/services/mongoDB/mongodbV1";
import { generateToken } from '@/services/tokens';
import { auth } from '@/services/firebaseAdmin';

// Create a new post
export async function POST(request: Request) {
    const body = await request.json(); // Parse request body
    const { accessToken, email } = body;
    if(!accessToken) {
        return NextResponse.json(
            { message: "Access token is required" },
            { status: 401 } // Unauthorized
        );
    }
    if(!email){
        return NextResponse.json(
            { message: "Email is required" },
            { status: 400 } // Bad Request
        );
    }
    // Verify the token with Firebase
    const decodedToken = await auth.verifyIdToken(accessToken);
    console.log('Decoded token:', decodedToken);
    const query = {
        email: email
    }
    const userExists = await getDocumentByQuery('user', query);
    if (userExists.length > 0) {
        const user = userExists[0];
        const token = generateToken(user._id.toString(), user.communitiesIds, user.neighborhoodId);

        const response = NextResponse.json(
            { user: user },
            { status: 200 },
        );

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 // 1 week in seconds
        });

        return response;
    }
    return NextResponse.json(
        { message: "User isn't exist" },
        { status: 409 }
    )

}

