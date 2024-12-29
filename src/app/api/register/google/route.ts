import { NextResponse } from "next/server";
import { auth } from '@/services/firebaseAdmin';
import { communityRegister } from "@/services/register";
import { generateToken } from "@/services/tokens";

// Create a new post
export async function POST(request: Request) {
    try {
        const body = await request.json(); // Parse request body
        const { accessToken } = body;
        body.communities=[];
        // Verify the token with Firebase
        const decodedToken = await auth.verifyIdToken(accessToken);
        console.log('Decoded token:', decodedToken);
        delete body.accessToken;
        const response:any = await communityRegister(body);
        if(response.status ===201){
            const addedUser = response.body;
            const id = response.body._id.toString();
            const communityId = response.body.communities[0]._id.toString();
            const neighborhoodId = response.body.neighborhood._id.toString();
            const nextResponse = NextResponse.json(
                { ...addedUser},
                { status: 201 }
            )
            const token = generateToken(id, [communityId],neighborhoodId);
            nextResponse.cookies.set('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                path: '/',
                maxAge: 7 * 24 * 60 * 60 // 1 week in seconds
            });
            return nextResponse;
        }
        else{
            return NextResponse.json(
                { message: response.message },
                { status: response.status }
            );
        }

    } catch (error: any) {
        console.error('Error in POST handler:', error);
        return NextResponse.json(
            { message: "Invalid token or other error occurred", error: error.message },
            { status: 401 }
        );
    }
}
