import { NextResponse } from "next/server";
import { getDocumentByQuery } from "@/services/mongodb";
import { generateToken } from '@/services/tokens';
import { hashVerificationCode } from '@/services/crypto'


// Create a new post
export async function POST(request: Request) {
    debugger
    const body = await request.json(); // Parse request body
    const { password , email} = body;
    if(!password) {
        return NextResponse.json(
            { message: "Password is required" },
            { status: 400 } // Bad Request
        );
    }
    if(!email) {
        return NextResponse.json(
            { message: "Email is required" },
            { status: 400 } // Bad Request
        );
    }
    const hashPassword = await hashVerificationCode(password);
    const getPass = {
        email: email,
        password: hashPassword
    }
    const currentPass = await getDocumentByQuery('password', getPass);
    if(currentPass.length===0){
        return NextResponse.json(
            { message: "Invalid password" },
            { status: 401 } // Unauthorized
        );
    }
    
    const query = {
        email: email
    }
    const userExists = await getDocumentByQuery('users', query);
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

