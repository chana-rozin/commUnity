import { NextResponse } from "next/server";
import {
    patchDocumentById,
} from "@/services/mongodb";
import axios from "axios";

export async function POST(request: Request,{ params }: { params: Promise<{ id: string }>}) {

    let { id } = await params;
    if (!id) {
        return NextResponse.json(
            { message: "Post ID is required" },
            { status: 400 } // Bad Request
        );
    }
    const body = await request.json() // Parse request body
    let userToUpdate = await axios.get(`http://localhost:3000/api/users/${id}`);
    let user = await userToUpdate.data
    user.likedBy.push(body);
    delete post._id;
    

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


export async function DELETE(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;
    if (!id) {
        return NextResponse.json(
            { message: "Post ID is required" },
            { status: 400 } // Bad Request
        );
    }
    const body = await request.json() // Parse request body
    let postToUpdate = await axios.get(`http://localhost:3000/api/posts/${id}`);
    let post = await postToUpdate.data
    post.likedBy = post.likedBy.filter((like: string) => like!== body);
    delete post._id;
    

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
