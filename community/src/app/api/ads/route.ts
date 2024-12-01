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
    console.log("Received body:", body);

    try {
        const newAd = new Ad(body);

        // Explicitly call validateSync() to trigger synchronous validation
        const validationError = newAd.validateSync();
        if (validationError) {
            throw new Error(validationError.message);
        }

        // If validation passes, insert the document using your custom insert function
        const result = await insertDocument('ads', newAd);
        console.log("Insert result: ", result);
        return NextResponse.json(
            { ...body, _id: result.insertedId }, // Return the created document with the inserted _id
            { status: 201 } // Created
        );
    } catch (error) {
        console.log("Validation or save failed:", error);  // Log any error that occurred

        // Handle validation or save errors
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message || "Failed to create ad" },
                { status: 400 } // Bad Request
            );
        } else {
            return NextResponse.json(
                { message: "An unknown error occurred" },
                { status: 500 } // Internal Server Error
            );
        }
    }
}
