import { NextResponse } from "next/server";
import {
    getAllDocuments,
    insertDocument,
} from "@/services/mongodb";

// Fetch all babysitter requests
export async function GET(request: Request) {
    const requests = await getAllDocuments("babysittings"); // Retrieve all babysitter requests
    return NextResponse.json(requests); // Return data as JSON
}

// Create a new babysitter request
export async function POST(request: Request) {
    const body = await request.json(); // Parse request body

    // Insert into the database
    const result = await insertDocument("babysittings", body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to create babysitter request" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { ...body, _id: result.insertedId },
        { status: 201 } // Created
    );
}
