import { NextResponse } from "next/server";
import {
    updateDocumentById,
    getDocumentById
} from "@/services/mongoDB/mongodb";

//Get a post by ID

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    let { id } = await params;

    if (!id) {
        return NextResponse.json(
            { message: "Post ID is required" },
            { status: 400 } // Bad Request
        );
    }
    const populate = [
        { path: 'creator', select: 'first_name last_name profile_picture_url' }, // Populate creator for post
        { path: 'comments.creator', select: 'first_name last_name profile_picture_url' } // Populate creator for comments
    ];
    // Retrieve the post from the database
    const post = await getDocumentById('post', id, populate);
    console.log('post:', post);

    if (!post) {
        return NextResponse.json(
            { message: "Post not found" },
            { status: 404 } // Not Found
        );
    }

    return NextResponse.json(post);
}

//Patch a post by ID

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    let { id } = await params;
    const body = await request.json(); // Parse request body
    if (!body) {
        return NextResponse.json(
            { message: "Missing required fields" },
            { status: 400 } // Bad Request
        );
    }
    delete body._id;
    delete body.creator;
    delete body.createdDate;
    delete body.comments;
    delete body.likedBy;
    if (!id) {
        return NextResponse.json(
            { message: "Post ID is required" },
            { status: 400 } // Bad Request
        );
    }
    
    // Update the post in the database
    const result = await updateDocumentById("post", id, body);

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


