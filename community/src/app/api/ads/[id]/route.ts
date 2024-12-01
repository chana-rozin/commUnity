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
    const { id } = await params;
    const body = await request.json();
    delete body._id;

    if (!id) {
        return NextResponse.json(
            { message: "Ad ID is required" },
            { status: 400 }
        );
    }

    try {
        // Use Mongoose findByIdAndUpdate to ensure middleware runs
        const updatedAd = await Ad.findByIdAndUpdate(id, body, {
            new: true, // Return the updated document
            runValidators: true, // Run schema validation on update
        });

        if (!updatedAd) {
            return NextResponse.json(
                { message: "Ad not found or update failed" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Ad updated successfully", data: updatedAd });
    } catch (error: unknown) { // Explicitly typing 'error' as 'unknown'
        if (error instanceof mongoose.Error.ValidationError) {
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        }

        // Type assertion to `Error` to access properties
        return NextResponse.json(
            { message: "An unknown error occurred", error: (error as Error).message },
            { status: 500 }
        );
    }
}


export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json(
            { message: "Ad ID is required" },
            { status: 400 }
        );
    }

    try {
        const deletedAd = await Ad.findByIdAndDelete(id);

        if (!deletedAd) {
            return NextResponse.json(
                { message: "Ad not found or already deleted" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Ad deleted successfully", data: deletedAd });
    }catch (error: unknown) {
        return NextResponse.json(
            { message: "An unknown error occurred", error: (error as Error).message },
            { status: 500 }
        );
    }
}

