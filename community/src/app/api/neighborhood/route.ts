import { NextResponse } from "next/server";
import { 
  getAllDocuments, 
  insertDocument, 
  updateDocumentById, 
  deleteDocumentById 
} from "@/services/mongodb.ts"; // Database functions from your services folder

// Fetch all neighborhoods
export async function GET(request: Request) {
    const data = await getAllDocuments("neighborhood"); // Retrieve all neighborhoods from the "neighborhoods" collection
    return NextResponse.json(data); // Return the data as JSON
}

// Create a new neighborhood
export async function POST(request: Request) {
    const body = await request.json(); // Parse the request body

    // Validate required fields
    if (!body.name || !body.city || !Array.isArray(body.streets) || !Array.isArray(body.residents)) {
        return NextResponse.json(
            { message: "Invalid input: name, city, streets, and residents are required." },
            { status: 400 } // Bad Request
        );
    }

    const result = await insertDocument("neighborhood", body); // Insert a new neighborhood into the database

    if (!result) {
        return NextResponse.json(
            { message: "Failed to create neighborhood" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { ...body, _id: result.insertedId }, 
        { status: 201 } // Created
    );
}

// Update a neighborhood by ID
export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Get the neighborhood ID from query parameters
    const body = await request.json(); // Parse the request body

    if (!id) {
        return NextResponse.json(
            { message: "Neighborhood ID is required" },
            { status: 400 } // Bad Request
        );
    }

    const result = await updateDocumentById("neighborhood", id, body); // Update the neighborhood in the database

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update neighborhood" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Neighborhood updated successfully" }
    );
}

// Delete a neighborhood by ID
export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Get the neighborhood ID from query parameters

    if (!id) {
        return NextResponse.json(
            { message: "Neighborhood ID is required" },
            { status: 400 } // Bad Request
        );
    }

    const result = await deleteDocumentById("neighborhood", id); // Delete the neighborhood in the database

    if (!result) {
        return NextResponse.json(
            { message: "Failed to delete neighborhood" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Neighborhood deleted successfully" }
    );
}
