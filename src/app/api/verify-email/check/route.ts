import { NextResponse } from "next/server";
import {  getAllDocuments } from "@/services/mongoDB/mongodb";
import { hashVerificationCode } from '@/services/crypto'

export async function POST(request: Request) {
    const body = await request.json(); // Parse request body
    console.log(body);
    if (!body.code || !body.email) {
        return NextResponse.json(
            { message: "Invalid Request" },
            { status: 400 }
        );
    }

    const verificationHash = hashVerificationCode(body.code);
    const verification = await getAllDocuments("VerifyEmail", { email: body.email, verificationHash });
    if (verification.length === 0) {
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