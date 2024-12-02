import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {
    updateDocumentById,
    deleteDocumentById,
} from "@/services/mongodb";
import Ad from "@/models/ad"; // Import the adSchema

// Update an ad by ID
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    let { id } = await params;
    const body = await request.json(); // Parse request body
    delete body._id; // Delete id from body to avoid conflicts

    if (!id) {
        return NextResponse.json(
            { message: "Ad ID is required" },
            { status: 400 } // Bad Request
        );
    }

    try {
        // Create a temporary document for validation
        const updatedAd = new Ad(body);

        // Validate the document (throws an error if validation fails)
        await updatedAd.validate();

        // Update the ad in the database
        const result = await updateDocumentById("ads", id, body);

        if (!result) {
            return NextResponse.json(
                { message: "Failed to update ad" },
                { status: 500 } // Internal Server Error
            );
        }

        return NextResponse.json({ message: "Ad updated successfully" });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            // Return validation error messages
            return NextResponse.json(
                { message: error.message },
                { status: 400 } // Bad Request
            );
        }

        return NextResponse.json(
            { message: "An unknown error occurred" },
            { status: 500 } // Internal Server Error
        );
    }
}

// Delete an ad by ID
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
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

    return NextResponse.json({ message: "Ad deleted successfully" });
}
