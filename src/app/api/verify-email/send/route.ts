import { NextResponse } from "next/server";
import {  insertTemporaryDocument, getDocumentByQuery} from "@/services/mongodb";
import {hashVerificationCode} from '@/services/crypto'
import sendEmail from '@/services/sendEmail'

export async function POST(request: Request) {
    const body = await request.json(); // Parse request body
    console.log(body);
    if (!body.email) {
        return NextResponse.json(
            { message: "Invalid Request" },
            { status: 400 }
        );
    }
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const verificationHash = hashVerificationCode(verificationCode);

    const newVerification  = {
        email: body.email,
        verificationHash
    }
    //Send Email Message
    console.log(verificationCode);
    sendEmail(body.email, 'קוד אימות עבור commUnity', `קוד האימות שלך הוא: ${verificationCode}`);
    
    // Insert into the database
    const result = await insertTemporaryDocument("verify-email", newVerification, 300);
    if (!result) {
        return NextResponse.json(
            { message: "Failed to save verifications" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Verification code sent and saved successfully" },
        { status: 201 } // Created
    );
}

export async function GET(request: Request){
    debugger
    const body = await request.json(); // Parse request body
    console.log(body);
    if (!body.code||!body.email) {
        return NextResponse.json(
            { message: "Invalid Request" },
            { status: 400 }
        );
    }

    const verificationHash = hashVerificationCode(body.code);
    const verification = await getDocumentByQuery("verify-email", { email: body.email, verificationHash });
    if(verification.length === 0) {
        return NextResponse.json(
            { message: "Invalid Verification Code" },
            { status: 401 } // Unauthorized
        );
    }
    return NextResponse.json(
        { message: "Verification successful" },
        { status: 200 } // OK
    )

}