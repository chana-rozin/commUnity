import { NextResponse } from "next/server";
import { 
  getAllDocuments, 
  insertDocument, 
  updateDocumentById, 
  deleteDocumentById 
} from "@/services/mongodb.ts";

// Fetch all borrowings
export async function GET(request: Request) {
    const borrowings = await getAllDocuments("borrowings"); // Retrieve all borrowings
    return NextResponse.json(borrowings); // Return data as JSON
}

// Create a new borrowing record
export async function POST(request: Request) {
    const body = await request.json(); // Parse request body

    // Validate required fields
    if (
        !body.askerId ||
        !body.item ||
        !body.publishDate ||
        !body.askedDate ||
        typeof body.active !== "boolean"
    ) {
        return NextResponse.json(
            { message: "Invalid input: All fields are required and must be valid." },
            { status: 400 } // Bad Request
        );
    }

    // Insert into the database
    const result = await insertDocument("borrowings", body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to create borrowing record" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { ...body, _id: result.insertedId },
        { status: 201 } // Created
    );
}

// Update a borrowing record by ID
export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Extract borrowing ID from query string
    const body = await request.json(); // Parse request body

    if (!id) {
        return NextResponse.json(
            { message: "Borrowing ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Update the borrowing record in the database
    const result = await updateDocumentById("borrowings", id, body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update borrowing record" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Borrowing record updated successfully" }
    );
}

// Delete a borrowing record by ID
export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Extract borrowing ID from query string

    if (!id) {
        return NextResponse.json(
            { message: "Borrowing ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Delete the borrowing record from the database
    const result = await deleteDocumentById("borrowings", id);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to delete borrowing record" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Borrowing record deleted successfully" }
    );
}
