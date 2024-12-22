import { NextResponse } from "next/server";
import {
    insertDocument,
    getAllDocuments,
    foreignKey
} from "@/services/mongoDB/mongodb";

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
        query.AuthorizedIds = { $in: commArray };
    }

    if (search) {
        query.name = { $regex: new RegExp(search, 'i') }; // Case-insensitive search in the "title"
    }

    // Retrieve posts based on the query
    posts = await getAllDocuments("event", query);

    return NextResponse.json(posts); // Return data as JSON
}


// Create a new post
export async function POST(request: Request) {
    debugger
    const body = await request.json(); // Parse request body
    if (!body) {
        return NextResponse.json(
            { message: "Missing required fields" },
            { status: 400 } // Bad Request
        );
    }
    delete body._id;
    delete body.createdDate;
    if (!body.AuthorizedIds) {
        return NextResponse.json(
            { message: "Missing required field: AuthorizedIds" },
            { status: 400 } // Bad Request
        );
    }
    body.AuthorizedIds.forEach((id: string, index: number, array: string[]) => {
        array[index] = foreignKey(id); // Update each element
    });
    // Insert into the database
    const result = await insertDocument("event", body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to create event" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { ...body, _id: result._id.toString() },
        { status: 201 } // Created
    );
}

