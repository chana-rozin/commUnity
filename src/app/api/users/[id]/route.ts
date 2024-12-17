import { NextResponse } from "next/server";
import {
    updateDocumentById,
    deleteDocumentById,
    getDocumentById,
    patchDocumentById
} from "@/services/mongoDB/mongodbV1";

//Get a post by ID

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    let { id } = await params;

    if (!id) {
        return NextResponse.json(
            { message: "User ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Retrieve the post from the database
    const user = await getDocumentById('user', id);
    console.log('post:', user);

    if (!user) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 } // Not Found
        );
    }

    return NextResponse.json(user, { status: 200 });
}

//Patch a post by ID

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        let { id } = await params;
        const body = await request.json(); // Parse request body

        if (!id) {
            throw new Error('User ID is required');
        }
        if (!body) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 } // Bad Request
            );
        }
        if (body._id)
            delete body._id; // Delete id from body to avoid conflicts
        // Update the post in the database
        const result = await patchDocumentById("user", id, body);

        if (!result) {
            throw new Error()
        }

        return NextResponse.json(
            { message: "User updated successfully" }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to update user" + (error as Error).message },
            { status: 500 } // Internal Server Error
        );
    }
}
// Delete a post by ID
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    let { id } = await params;


    if (!id) {
        return NextResponse.json(
            { message: "User ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Delete the post from the database
    const result = await deleteDocumentById("user", id);

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
