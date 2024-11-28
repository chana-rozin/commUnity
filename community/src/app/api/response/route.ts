import { NextResponse } from "next/server";
import { 
  getAllDocuments, 
  insertDocument, 
  updateDocumentById, 
  deleteDocumentById 
} from "@/services/mongodb";

// Fetch all responses
export async function GET(request: Request) {
    const responses = await getAllDocuments("responses"); // Retrieve all responses
    return NextResponse.json(responses); // Return data as JSON
}

// Create a new response
export async function POST(request: Request) {
    const body = await request.json(); // Parse request body

    // Validate required fields
    if (
        !body.publisherId ||
        !body.publishingTime ||
        !body.body ||
        !Array.isArray(body.likeIds)
    ) {
        return NextResponse.json(
            { message: "Invalid input: All fields are required and must be valid." },
            { status: 400 } // Bad Request
        );
    }

    // Insert into the database
    const result = await insertDocument("responses", body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to create response" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { ...body, _id: result.insertedId },
        { status: 201 } // Created
    );
}

// Update a response by ID
export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Extract response ID from query string
    const body = await request.json(); // Parse request body

    if (!id) {
        return NextResponse.json(
            { message: "Response ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Update the response in the database
    const result = await updateDocumentById("responses", id, body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update response" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Response updated successfully" }
    );
}

// Delete a response by ID
export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Extract response ID from query string

    if (!id) {
        return NextResponse.json(
            { message: "Response ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Delete the response from the database
    const result = await deleteDocumentById("responses", id);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to delete response" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Response deleted successfully" }
    );
}
