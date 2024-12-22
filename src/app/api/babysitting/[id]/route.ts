import { NextResponse } from "next/server";
import {
    updateDocumentById,
    deleteDocumentById
} from "@/services/mongoDB/mongodb";
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
    const result = await updateDocumentById("Babysitting", id, body);

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
    const result = await deleteDocumentById("Babysitting", id);

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
