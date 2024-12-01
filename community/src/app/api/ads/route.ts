import { NextResponse } from "next/server";
import {
    getAllDocuments,
    insertDocument,
} from "@/services/mongodb";
import Ad from '@/models/ad' // Import the Mongoose model

// Fetch all ads
export async function GET(request: Request) {
    const ads = await getAllDocuments("ads"); // Retrieve all ads
    return NextResponse.json(ads); // Return data as JSON
}

// Create a new ad
export async function POST(request: Request) {

    const body = await request.json();

    try {
        // Use Mongoose to validate the data
        const newAd = new Ad(body);

        // Validate the document (this throws if validation fails)
        await newAd.validate();

        // If validation passes, use the service to insert the document
        const result = await insertDocument("ads", newAd.toObject());

        return NextResponse.json(
            { ...body, _id: result.insertedId },
            { status: 201 } // Created
        );
    } catch (error) {
        // Narrow the type of `error` to handle it
        if (error instanceof Error) {
            // Access `error.message`
            return NextResponse.json(
                { message: error.message || "Failed to create ad" },
                { status: 400 } // Bad Request
            );
        } else {
            // Handle unexpected error types
            return NextResponse.json(
                { message: "An unknown error occurred" },
                { status: 500 } // Internal Server Error
            );
        }
    }
}


