import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {
    updateDocumentById,
    deleteDocumentById,
    getDocumentById,
} from "@/services/mongoDB/mongodb";


export async function GET(request: Request,
    { params }: { params: Promise<{ id: string }> }) {
        
    let { id } = await params;
    const ads = await getDocumentById("ad",id); // Retrieve all ads
    return NextResponse.json(ads); // Return data as JSON
}
// Update an ad by ID
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    let { id } = await params;
    const body = await request.json(); // Parse request body
    delete body._id; // Delete id from body to avoid conflicts
    delete body.createdAt;


    if (!id) {
        return NextResponse.json(
            { message: "Ad ID is required" },
            { status: 400 } // Bad Request
        );
    }

    try {
        // Update the ad in the database
        const result = await updateDocumentById("ad", id, body);

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
    const result = await deleteDocumentById("ad", id);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to delete ad" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json({ message: "Ad deleted successfully" });
}
