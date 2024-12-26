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
            { message: "Community ID is required" },
            { status: 400 } // Bad Request
        );
    }
    const populate = [
        { path: 'members._id', select: 'first_name last_name profile_picture_url' }
    ];
    // Retrieve the post from the database
    const community = await getDocumentById('post', id, populate);

    if (!community) {
        return NextResponse.json(
            { message: "Post not found" },
            { status: 404 } // Not Found
        );
    }

    return NextResponse.json(community);
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
    if (!id) {
        return NextResponse.json(
            { message: "Post ID is required" },
            { status: 400 } // Bad Request
        );
    }
    delete body._id;
    // Update the community in the database
    const result = await updateDocumentById("community", id, body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update community" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Community updated successfully" }
    );
}


