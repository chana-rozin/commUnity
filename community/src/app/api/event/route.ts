import { NextResponse } from "next/server";
import {
    getAllDocuments,
    insertDocument,
    updateDocumentById,
    deleteDocumentById
} from "@/services/mongodb";

// Fetch all events
export async function GET(request: Request) {
    const events = await getAllDocuments("events"); // Retrieve all events
    return NextResponse.json(events); // Return data as JSON
}

// Create a new event
export async function POST(request: Request) {
    const body = await request.json(); // Parse request body

    // Validate required fields
    if (
        !body.name ||
        !body.description ||
        !body.date ||
        !body.publishedDate ||
        typeof body.active !== "boolean" ||
        !Array.isArray(body.viewingPermissions) ||
        !body.location
    ) {
        return NextResponse.json(
            { message: "Invalid input: All fields are required and must be valid." },
            { status: 400 } // Bad Request
        );
    }

    // Insert into the database
    const result = await insertDocument("events", body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to create event" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { ...body, _id: result.insertedId },
        { status: 201 } // Created
    );
}

// Update an event by ID
export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Extract event ID from query string
    const body = await request.json(); // Parse request body

    if (!id) {
        return NextResponse.json(
            { message: "Event ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Update the event in the database
    const result = await updateDocumentById("events", id, body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update event" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Event updated successfully" }
    );
}

// Delete an event by ID
export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Extract event ID from query string

    if (!id) {
        return NextResponse.json(
            { message: "Event ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Delete the event from the database
    const result = await deleteDocumentById("events", id);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to delete event" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Event deleted successfully" }
    );
}
