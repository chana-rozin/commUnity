import { NextResponse } from "next/server";
import {
    insertDocument,
    getDocumentByQuery
} from "@/services/mongodb";

// Fetch all posts
// Fetch all or filtered posts
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const communities = searchParams.get("communities");
    const search = searchParams.get("search");
    let query: any = {}; // Initialize the query object
    let posts;

    if (communities) {
        // Split the communities parameter into an array
        const commArray = communities.split(",");
        // Create a query that checks both 'communitiesIds' or 'neighborhoods' field
        query.communitiesIds = { $in: commArray };
    }

    if (search) {
        query.title = { $regex: new RegExp(search, 'i') }; // Case-insensitive search in the "title"
    }

    // Retrieve posts based on the query
    posts = await getDocumentByQuery("posts", query);

    return NextResponse.json(posts); // Return data as JSON
}


// Create a new post
export async function POST(request: Request) {
    const body = await request.json(); // Parse request body
    if (!body) {
        return NextResponse.json(
            { message: "Missing required fields" },
            { status: 400 } // Bad Request
        );
    }
    delete body._id;
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

