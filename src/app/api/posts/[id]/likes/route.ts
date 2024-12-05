import { NextResponse } from "next/server";
import {
    patchDocumentById,
    getDocumentById,

} from "@/services/mongodb";


export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {

    let { id } = await params;
    if (!id) {
        return NextResponse.json(
            { message: "Post ID is required" },
            { status: 400 } // Bad Request
        );
    }
    const body = await request.json() // Parse request body
    let postToUpdate = await getDocumentById("posts", id)
    if (!postToUpdate) {
        return NextResponse.json(
            { message: "Failed to found post" },
            { status: 404 } // Internal Server Error
        );
    }
    let post = postToUpdate;
    post.likedBy.push(body);

    // Update the post in the database
    const result = await patchDocumentById("posts", id, post);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to Add like" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Like successfully added" },
        { status: 200 },  // OK Status Code 200
    );
}


export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    let { id } = await params;
    if (!id) {
        return NextResponse.json(
            { message: "Post ID is required" },
            { status: 400 } // Bad Request
        );
    }
    const body = await request.json() // Parse request body
    const postDocument = await getDocumentById('posts', id);

    if (!postDocument) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 } // Not Found
        );
    }

    let post = postDocument

    post.likedBy = post.likedBy.filter((like: string) => like !== body);

    // Update the post in the database
    const result = await patchDocumentById("posts", id, post);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to Delete like" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Like successfully deleted" },
        { status: 200 },
    );
}
