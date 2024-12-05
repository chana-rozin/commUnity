import { NextResponse } from "next/server";
import { insertDocument } from "@/services/mongodb";
import { hashVerificationCode } from '@/services/crypto'
import { generateToken } from '@/services/tokens'

// Create a new post
export async function POST(request: Request) {
    try {
        const body = await request.json(); // Parse request body
        console.log(body);
        const { password, email, communitiesIds, neighborhoodId } = body;
        const hashPassword = await hashVerificationCode(password);
        const savePasswordAtDb = await insertDocument("password", { password: hashPassword, email: email });
        if (!savePasswordAtDb) {
            return NextResponse.json(
                { message: "Failed to save password at database" },
                { status: 500 } // Internal Server Error
            );
        }
        delete body.password;
        // Insert into the database
        const result = await insertDocument("users", body);

        if (!result) {
            return NextResponse.json(
                { message: "Failed to create user" },
                { status: 500 } // Internal Server Error
            );
        }
        const id = result.insertedId.toString();
        //Generate token
        const token = generateToken(id, communitiesIds, neighborhoodId);
        //response with token in httpOnly:
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

