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
            { message: "Event ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Retrieve the post from the database
    const event = await getDocumentById('events',id);
    console.log('event:', event);
    
    if (!event) {
        return NextResponse.json(
            { message: "Event not found" },
            { status: 404 } // Not Found
        );
    }

    return NextResponse.json(event);
}

//Patch a post by ID

export async function PATCH(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    debugger
    let { id } = await params;
    const body = await request.json(); // Parse request body
    if (!body) {
        return NextResponse.json(
            { message: "Missing required fields" },
            { status: 400 } // Bad Request
        );
    }
    delete body._id;
    if (!id) {
        return NextResponse.json(
            { message: "Event ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Update the post in the database
    const result = await patchDocumentById("events", id, body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update event" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Event updated successfully" }
    );
}


// Delete a post by ID
export async function DELETE(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;


    if (!id) {
        return NextResponse.json(
            { message: "Event ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Delete the post from the database
    const result = await deleteDocumentById("events", id);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to delete event" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Event deleted successfully" }
    );
}
