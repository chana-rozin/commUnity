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
            { message: "Minyan ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Retrieve the post from the database
    const minyan = await getDocumentById('minyans',id);
    
    if (!minyan) {
        return NextResponse.json(
            { message: "Minyan not found" },
            { status: 404 } // Not Found
        );
    }

    return NextResponse.json(minyan);
}

//Patch a post by ID

export async function PATCH(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;
    const body = await request.json(); // Parse request body

    if (!id) {
        return NextResponse.json(
            { message: "Minyan ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Update the post in the database
    const result = await patchDocumentById("minyans", id, body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update minyan" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Minyan updated successfully" }
    );
}
// Update a post by ID
export async function PUT(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;
    const body = await request.json(); // Parse request body

    if (!id) {
        return NextResponse.json(
            { message: "Minyan ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Update the post in the database
    const result = await updateDocumentById("minyans", id, body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update minyan" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Minyan updated successfully" }
    );
}

// Delete a post by ID
export async function DELETE(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;


    if (!id) {
        return NextResponse.json(
            { message: "Minyan ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Delete the post from the database
    const result = await deleteDocumentById("minyans", id);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to delete minyan" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Minyan deleted successfully" }
    );
}
