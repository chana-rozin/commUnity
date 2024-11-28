import { NextResponse } from "next/server";
import {
    getAllDocuments,
    insertDocument,
} from "@/services/mongodb";

// Fetch all posts
export async function GET(request: Request) {
    const posts = await getAllDocuments("posts"); // Retrieve all posts
    return NextResponse.json(posts); // Return data as JSON
}

// Create a new post
export async function POST(request: Request) {
    const body = await request.json(); // Parse request body
    console.log(body);
        // return NextResponse.json(
        //     { message: "Invalid input: All fields are required and must be valid." },
        //     { status: 400 } // Bad Request
        // );
    

    // Insert into the database
    const result = await insertDocument("posts", body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to create post" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { ...body, _id: result.insertedId },
        { status: 201 } // Created
    );
}

