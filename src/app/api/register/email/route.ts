import { NextResponse } from "next/server";
import { insertDocument } from "@/services/mongoDB/mongodb";
import { hashVerificationCode } from '@/services/crypto'
import { communityRegister } from '@/services/register';
import { generateToken } from "@/services/tokens";

// Create a new post
export async function POST(request: Request) {
    debugger
    try {
        const body = await request.json(); // Parse request body
        console.log(body);
        const { password, email, neighborhood } = body;
        const hashPassword = await hashVerificationCode(password);
        const passToInsert: any = { password: hashPassword, email: email }
        const savePasswordAtDb = await insertDocument("password", passToInsert);
        if (!savePasswordAtDb) {
            return NextResponse.json(
                { message: "Failed to save password at database" },
                { status: 500 } // Internal Server Error
            );
        }
        delete body.password;
        // Insert into the database
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

