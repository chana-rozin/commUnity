import { NextResponse } from "next/server";
import {
    getAllDocuments,
    insertDocument,
    updateDocumentById,
    deleteDocumentById
} from "@/services/mongodb";

// Fetch all Minyanim
export async function GET(request: Request) {
    const minyanim = await getAllDocuments("minyanim"); // Retrieve all minyanim
    return NextResponse.json(minyanim); // Return data as JSON
}

// Create a new Minyan
export async function POST(request: Request) {
    const body = await request.json(); // Parse request body

    // Validate required fields
    if (
        !body.category ||
        !body.location ||
        !body.time ||
        !body.numParticipants ||
        typeof body.fixed !== "boolean" ||
        !Array.isArray(body.viewingPermissions)
    ) {
        return NextResponse.json(
            { message: "Invalid input: All fields are required and must be valid." },
            { status: 400 } // Bad Request
        );
    }

    // Insert into the database
    const result = await insertDocument("minyanim", body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to create minyan" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { ...body, _id: result.insertedId },
        { status: 201 } // Created
    );
}

// Update a Minyan by ID
export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Extract minyan ID from query string
    const body = await request.json(); // Parse request body

    if (!id) {
        return NextResponse.json(
            { message: "Minyan ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Update the minyan in the database
    const result = await updateDocumentById("minyanim", id, body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update minyan" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Minyan updated successfully" }
    );
}

// Delete a Minyan by ID
export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Extract minyan ID from query string

    if (!id) {
        return NextResponse.json(
            { message: "Minyan ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Delete the minyan from the database
    const result = await deleteDocumentById("minyanim", id);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to delete minyan" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Minyan deleted successfully" }
    );
}
