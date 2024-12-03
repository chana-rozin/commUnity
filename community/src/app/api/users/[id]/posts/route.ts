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
    user.savedPostsIds.push(body);
    delete user._id;
    

    // Update the post in the database
    const result = await patchDocumentById("users", id, user);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to Add post to user saves" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "post successfully added to user saves" },
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
    let userToUpdate = await axios.get(`http://localhost:3000/api/users/${id}`);
    let user = await userToUpdate.data
    user.savedPostsIds = user.savedPostsIds.filter((postId: string) => postId!== body);
    delete user._id;
    

    // Update the post in the database
    const result = await patchDocumentById("users", id, user);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to Delete post from user saves" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "post deleted successfully" },
        { status: 200 }, 
    );
}
