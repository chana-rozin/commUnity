import { NextResponse } from "next/server";
import { getDocumentByQuery, patchDocumentById } from "@/services/mongoDB/mongodbV1";
import { hashVerificationCode } from '@/services/crypto'

export async function POST(request: Request) {
    const body = await request.json(); // Parse request body
    const { email, password } = body;
    if(!email||!password) {
        return NextResponse.json(
            { message: "Invalid data" },
            { status: 400 } // Bad Request
        );
    }
    const hashPassword = await hashVerificationCode(password);
    const query:any={}
    query.email = email;
    const passwordToChange:any = await getDocumentByQuery('password',query );
    if(passwordToChange.length ===0){
        return NextResponse.json(
            { message: "Invalid email or password" },
            { status: 401 } // Unauthorized
        );
    }
    // Insert into the database
    const result = await patchDocumentById("password", passwordToChange[0]._id.toString(), {password:hashPassword});

    if (!result) {
        return NextResponse.json(
            { message: "Failed to change password" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { status: 200 } // Created
    );
}

