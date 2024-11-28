import { NextResponse } from "next/server";
import {
    updateDocumentById,
    deleteDocumentById,
    getDocumentById
} from "@/services/mongodb";

//Get a post by ID

export async function GET(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;

    if (!id) {
        return NextResponse.json(
            { message: "Post ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Retrieve the post from the database
    const post = await getDocumentById('posts',id);
    console.log('post:', post);
    
    if (!post) {
        return NextResponse.json(
            { message: "Post not found" },
            { status: 404 } // Not Found
        );
    }

    return NextResponse.json(post);
}

// Update a post by ID
export async function PUT(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;
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
