import { NextResponse } from "next/server";
import {
    getAllDocuments,
    insertDocument,
    updateDocumentById,
    deleteDocumentById
} from "@/services/mongodb";

// Fetch all babysitter requests
export async function GET(request: Request) {
    const requests = await getAllDocuments("babysitterRequests"); // Retrieve all babysitter requests
    return NextResponse.json(requests); // Return data as JSON
}

// Create a new babysitter request
export async function POST(request: Request) {
    const body = await request.json(); // Parse request body

    // Validate required fields
    if (
        !body.requesterId ||
        !body.babysitterId ||
        !body.date ||
        !body.location ||
        !body.numOfChildren ||
        !Array.isArray(body.ages) ||
        !Array.isArray(body.viewingPermissions)
    ) {
        return NextResponse.json(
            { message: "Invalid input: All fields are required and must be valid." },
            { status: 400 } // Bad Request
        );
    }

    // Insert into the database
    const result = await insertDocument("babysitterRequests", body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to create babysitter request" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { ...body, _id: result.insertedId },
        { status: 201 } // Created
    );
}

// Update a babysitter request by ID
export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Extract babysitter request ID from query string
    const body = await request.json(); // Parse request body

    if (!id) {
        return NextResponse.json(
            { message: "Babysitter request ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Update the babysitter request in the database
    const result = await updateDocumentById("babysitterRequests", id, body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update babysitter request" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Babysitter request updated successfully" }
    );
}

// Delete a babysitter request by ID
export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Extract babysitter request ID from query string

    if (!id) {
        return NextResponse.json(
            { message: "Babysitter request ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Delete the babysitter request from the database
    const result = await deleteDocumentById("babysitterRequests", id);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to delete babysitter request" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Babysitter request deleted successfully" }
    );
}
