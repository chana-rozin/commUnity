import { NextResponse } from "next/server";
import {patchDocumentById, getDocumentById} from "@/services/mongodb";
import { User } from "@/types/user.type";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        let { id } = await params;
        if (!id) {
            throw new Error('User ID is required');
        }
        const body = await request.json(); // Parse request body
        
        // Fetch the user document
        const userToUpdate = await getDocumentById('users', id);
        let user = userToUpdate?.data as User;
        
        if (!user) {
            throw new Error('User not found');
        }

        // Create a new object without the _id field for update
        const updateData: Omit<User, '_id'> = {
            ...user,
            savedPostsIds: [...user.savedPostsIds, body]
        };

        // Update the post in the database
        const result = await patchDocumentById("users", id, updateData);

        if (!result) {
            throw new Error('Update failed');
        }

        return NextResponse.json(
            { message: "Post successfully added to user saves" },
            { status: 200 },  // OK Status Code 200
        );
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to Add post to user saves" },
            { status: 500 } // Internal Server Error
        );
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        let { id } = await params;
        if (!id) {
            return NextResponse.json(
                { message: "Post ID is required" },
                { status: 400 } // Bad Request
            );
        }
        
        const body = await request.json(); // Parse request body
        const userDocument = await getDocumentById('users', id);
        
        if (!userDocument) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 } // Not Found
            );
        }

        const user = userDocument.data as User;

        // Create a new object without the _id field for update
        const updateData: Omit<User, '_id'> = {
            ...user,
            savedPostsIds: user.savedPostsIds.filter((postId: string) => postId !== body)
        };

        // Update the post in the database
        const result = await patchDocumentById("users", id, updateData);

        if (!result) {
            return NextResponse.json(
                { message: "Failed to Delete post from user saves" },
                { status: 500 } // Internal Server Error
            );
        }

        return NextResponse.json(
            { message: "Post deleted successfully" },
            { status: 200 },
        );
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "An error occurred" },
            { status: 500 }
        );
    }
}