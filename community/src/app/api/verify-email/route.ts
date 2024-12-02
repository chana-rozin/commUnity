import { NextResponse } from "next/server";
import {  insertTemporaryDocument} from "@/services/mongodb";
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import {hashVerificationCode} from '@/services/crypto'

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
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    });
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