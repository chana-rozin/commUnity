import { NextResponse } from "next/server";
import {
    patchDocumentById,
    getDocumentById
} from "@/services/mongodb";
export async function POST(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    console.log('post comment');
    
    let { id } = await params;
    const body = await request.json(); // Parse request body
    let postToUpdate = await getDocumentById("posts",id)
    if(!postToUpdate){
        return NextResponse.json(
            { message: "Failed to found post" },
            { status: 404 } // Internal Server Error
        );
    }
    let post = postToUpdate;
    post.comments.push(body);
    if (!id) {
        return NextResponse.json(
            { message: "Post ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Update the post in the database
    const result = await patchDocumentById("posts", id, post);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to create comment" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Comment created successfully" }
    );
}
