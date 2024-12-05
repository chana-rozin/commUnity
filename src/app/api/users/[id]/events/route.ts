import { NextResponse } from "next/server";
import { patchDocumentById, getDocumentById } from "@/services/mongodb";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    debugger
    try {
        let { id } = await params;
        if (!id) {
            throw new Error('User ID is required');
        }
        const body = await request.json(); // Parse request body

        // Fetch the user document
        const userToUpdate = await getDocumentById('users', id);
        if (!userToUpdate) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 },  // OK Status Code 200
            );
        }
        let user = userToUpdate;
        user.savedEventsIds.push(body);

        // Update the post in the database
        const result = await patchDocumentById("users", id, user);

        if (!result) {
            throw new Error('Update failed');
        }

        return NextResponse.json(
            { message: "Event successfully added to user saves" },
            { status: 200 },  // OK Status Code 200
        );
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to Add event to user saves" },
            { status: 500 } // Internal Server Error
        );
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        let { id } = await params;
        if (!id) {
            return NextResponse.json(
                { message: "User ID is required" },
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

        let user = userDocument
        let savedEventsIds = user.savedEventsIds.filter((postId: string) => postId !== body);
        user.savedEventsIds = savedEventsIds;

        // Update the post in the database
        const result = await patchDocumentById("users", id, user);

        if (!result) {
            return NextResponse.json(
                { message: "Failed to Delete event from user saves" },
                { status: 500 } // Internal Server Error
            );
        }

        return NextResponse.json(
            { message: "Event deleted successfully" },
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