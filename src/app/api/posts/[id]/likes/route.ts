import { NextResponse } from "next/server";
import {
    patchDocumentById,
} from "@/services/mongodb";
import {getPostById} from "@/services/posts";
import axios from "axios";
import { debug } from "util";
import http from "@/services/http";

export async function POST(request: Request,{ params }: { params: Promise<{ id: string }>}) {

    let { id } = await params;
    if (!id) {
        return NextResponse.json(
            { message: "Post ID is required" },
            { status: 400 } // Bad Request
        );
    }
    const body = await request.json() // Parse request body
    let postToUpdate = await http.get(`/posts/${id}`);
    let post = await postToUpdate.data
    post.likedBy.push(body);
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
    let post = await getPostById(id);
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
