import { NextResponse } from "next/server";
import {  insertTemporaryDocument, getDocumentByQuery} from "@/services/mongodb";
import nodemailer from 'nodemailer';
import {hashVerificationCode} from '@/services/crypto'

export async function POST(request: Request){
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