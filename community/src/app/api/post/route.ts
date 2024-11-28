import { NextResponse } from "next/server";
import { 
  getAllDocuments, 
  insertDocument, 
  updateDocumentById, 
  deleteDocumentById 
} from "@/services/mongodb";

// Fetch all posts
export async function GET(request: Request) {
    const posts = await getAllDocuments("posts"); // Retrieve all posts
    return NextResponse.json(posts); // Return data as JSON
}

// Create a new post
export async function POST(request: Request) {
    const body = await request.json(); // Parse request body

    // Validate required fields
    if (
        !body.publisherId ||
        !body.groupId ||
        !body.publishTime ||
        !body.title ||
        !body.body ||
        !Array.isArray(body.attachments) ||
        !Array.isArray(body.commentIds) ||
        !Array.isArray(body.likeIds)
    ) {
        return NextResponse.json(
            { message: "Invalid input: All fields are required and must be valid." },
            { status: 400 } // Bad Request
        );
    }

    // Insert into the database
    const result = await insertDocument("posts", body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to create post" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { ...body, _id: result.insertedId },
        { status: 201 } // Created
    );
}

// Update a post by ID
export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Extract post ID from query string
    const body = await request.json(); // Parse request body

    if (!id) {
        return NextResponse.json(
            { message: "Post ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Update the post in the database
    const result = await updateDocumentById("posts", id, body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update post" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Post updated successfully" }
    );
}

// Delete a post by ID
export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Extract post ID from query string

    if (!id) {
        return NextResponse.json(
            { message: "Post ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Delete the post from the database
    const result = await deleteDocumentById("posts", id);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to delete post" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Post deleted successfully" }
    );
}
