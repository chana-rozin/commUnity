import { NextResponse } from "next/server";
import { 
  getAllDocuments, 
  insertDocument, 
  updateDocumentById, 
  deleteDocumentById 
} from "@/services/mongodb.ts";

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

// Update an ad by ID
export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Extract ad ID from query string
    const body = await request.json(); // Parse request body

    if (!id) {
        return NextResponse.json(
            { message: "Ad ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Update the ad in the database
    const result = await updateDocumentById("ads", id, body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update ad" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Ad updated successfully" }
    );
}

// Delete an ad by ID
export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Extract ad ID from query string

    if (!id) {
        return NextResponse.json(
            { message: "Ad ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Delete the ad from the database
    const result = await deleteDocumentById("ads", id);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to delete ad" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Ad deleted successfully" }
    );
}
