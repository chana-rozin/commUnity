import { NextResponse } from "next/server"; // Import Next.js response object
import { 
  getAllDocuments, 
  getDocumentById, 
  insertDocument, 
  updateDocumentById, 
  deleteDocumentById 
} from "@/services/mongodb"; // Database functions from a shared service

// Fetch all users
export async function GET(request: Request) {
    const data = await getAllDocuments("users"); // Retrieve all users from the "users" collection
    return NextResponse.json(data); // Return the data as JSON
}

// Create a new user
export async function POST(request: Request) {
    const body = await request.json(); // Parse the request body
    const result = await insertDocument("users", body); // Insert a new document into the "users" collection

    if (!result) {
        return NextResponse.json(
            { message: "Failed to create user" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { ...body, _id: result.insertedId }, 
        { status: 201 } // Created
    );
}

// Update a user by ID
export async function PUT(request: Request) {
    const url = new URL(request.url); 
    const id = url.searchParams.get("id"); // Get the user ID from query parameters
    const body = await request.json(); // Parse the request body

    if (!id) {
        return NextResponse.json(
            { message: "User ID is required" },
            { status: 400 } // Bad Request
        );
    }

    const result = await updateDocumentById("users", id, body); // Update the user in the database

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update user" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "User updated successfully" }
    );
}

// Delete a user by ID
export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Get the user ID from query parameters

    if (!id) {
        return NextResponse.json(
            { message: "User ID is required" },
            { status: 400 } // Bad Request
        );
    }

    const result = await deleteDocumentById("users", id); // Delete the user in the database

    if (!result) {
        return NextResponse.json(
            { message: "Failed to delete user" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "User deleted successfully" }
    );
}
