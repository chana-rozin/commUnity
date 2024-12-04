import { NextResponse } from "next/server";
import {
    getAllDocuments,
    insertDocument,
} from "@/services/mongodb";

// Fetch all posts
export async function GET(request: Request) {
    const users = await getAllDocuments("users"); // Retrieve all posts
    if (!users) {
        return NextResponse.json(
            { message: "Failed to found users" },
            { status: 500 } // Internal Server Error
        );
    }
    return NextResponse.json(users, { status: 200 }); // Return data as JSON
}

// Create a new post
export async function POST(request: Request) {
    const body = await request.json(); // Parse request body
    console.log(body);
    delete body._id;
    
    // Insert into the database
    const result = await insertDocument("users", body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to create user" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { ...body, _id: result.insertedId },
        { status: 201 } // Created
    );
}

