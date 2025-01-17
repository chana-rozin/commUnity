import { NextResponse } from "next/server";
import { generateToken } from '@/services/tokens';
import { hashVerificationCode } from '@/services/crypto'
import { getAllDocuments } from "@/services/mongoDB/mongodb";


// Create a new post
export async function POST(request: Request) {
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
    const currentPass = await getAllDocuments('password', getPass);
    if(currentPass.length===0){
        return NextResponse.json(
            { message: "Invalid password" },
            { status: 401 } // Unauthorized
        );
    }
    
    const query = {
        email: email
    }
    const populate = [
        { path: 'neighborhood', select: 'name' },
        { path: 'communities', select: 'name' },
        { path: 'notifications.sender', select: 'name'}
    ];
    const userExists = await getAllDocuments('user', query, populate);
    if (userExists.length > 0) {
        const user = userExists[0];
        const token = generateToken(user._id.toString(), user.communities, user.neighborhood._id);

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

