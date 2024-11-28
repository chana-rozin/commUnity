import { NextResponse } from "next/server";
import {
    updateDocumentById,
    deleteDocumentById
} from "@/services/mongodb";
// Update an ad by ID
export async function PUT(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;
    
    const body = await request.json(); // Parse request body
    delete body._id; // Delete id from body
    

    if (!id) {
        return NextResponse.json(
            { message: "Ad ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Update the ad in the database
    const result = await updateDocumentById("ads", id, body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update ad" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Ad updated successfully" }
    );
}

// Delete an ad by ID
export async function DELETE(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;


    if (!id) {
        return NextResponse.json(
            { message: "Ad ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Delete the ad from the database
    const result = await deleteDocumentById("ads", id);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to delete ad" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Ad deleted successfully" }
    );
}
