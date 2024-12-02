import { NextResponse } from "next/server";
import {
    patchDocumentById,
} from "@/services/mongodb";
import axios from "axios";
import { debug } from "util";
export async function POST(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    console.log('post comment');
    let { id } = await params;
    const body = await request.json() // Parse request body
    let postToUpdate = await axios.get(`http://localhost:3000/api/posts/${id}`);
    let post = await postToUpdate.data
    post.likedBy.push(body);
    delete post._id;
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
            { message: "Failed to Add like" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Like successfully added" }
    );
}
