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
            { message: "Loan ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Retrieve the post from the database
    const loan = await getDocumentById('loans',id);
    console.log('loan:', loan);
    
    if (!loan) {
        return NextResponse.json(
            { message: "Loan not found" },
            { status: 404 } // Not Found
        );
    }

    return NextResponse.json(loan);
}

//Patch a post by ID

export async function PATCH(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;
    const body = await request.json(); // Parse request body

    if (!id) {
        return NextResponse.json(
            { message: "Loan ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Update the post in the database
    const result = await patchDocumentById("loans", id, body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update loan" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Loan updated successfully" }
    );
}
// Update a post by ID
export async function PUT(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;
    const body = await request.json(); // Parse request body

    if (!id) {
        return NextResponse.json(
            { message: "Loan ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Update the post in the database
    const result = await updateDocumentById("loans", id, body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update loan" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Loan updated successfully" }
    );
}

// Delete a post by ID
export async function DELETE(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;


    if (!id) {
        return NextResponse.json(
            { message: "Loan ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Delete the post from the database
    const result = await deleteDocumentById("loans", id);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to delete loan" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Loan deleted successfully" }
    );
}
