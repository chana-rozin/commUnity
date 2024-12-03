import { NextResponse } from "next/server";
import {
    updateDocumentById,
    deleteDocumentById,
    getDocumentById,
    patchDocumentById
} from "@/services/mongodb";

//Get a post by ID

export async function GET(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;

    if (!id) {
        return NextResponse.json(
            { message: "User ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Retrieve the post from the database
    const user = await getDocumentById('users',id);
    console.log('post:', user);
    
    if (!user) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 } // Not Found
        );
    }

    return NextResponse.json(user, { status: 200});
}

//Patch a post by ID

export async function PATCH(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;
    const body = await request.json(); // Parse request body

    if (!id) {
        return NextResponse.json(
            { message: "User ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Update the post in the database
    const result = await patchDocumentById("users", id, body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update user" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "User updated successfully" }
    );
}
// Delete a post by ID
export async function DELETE(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;


    if (!id) {
        return NextResponse.json(
            { message: "User ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Delete the post from the database
    const result = await deleteDocumentById("users", id);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to delete user" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "User deleted successfully" }
    );
}