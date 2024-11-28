import { NextResponse } from "next/server";
import {
    getAllDocuments,
    insertDocument,
} from "@/services/mongodb";

// Fetch all ads
export async function GET(request: Request) {
    const ads = await getAllDocuments("ads"); // Retrieve all ads
    return NextResponse.json(ads); // Return data as JSON
}

// Create a new ad
export async function POST(request: Request) {
    const body = await request.json(); // Parse request body

    // Validate required fields
    if (
        !body.name ||
        !body.description ||
        !body.publishDate ||
        !body.expiryDate ||
        !Array.isArray(body.viewingPermissions)
    ) {
        return NextResponse.json(
            { message: "Invalid input: All fields are required and must be valid." },
            { status: 400 } // Bad Request
        );
    }

    // Insert into the database
    const result = await insertDocument("ads", body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to create ad" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { ...body, _id: result.insertedId },
        { status: 201 } // Created
    );
}

