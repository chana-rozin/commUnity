import { NextResponse } from "next/server";
import {
    insertDocument,
    getAllDocuments,
    foreignKey,
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
        query.communitiesIds = { $in: commArray };
    }


    if (search) {
        query.title = { $regex: new RegExp(search, 'i') }; // Case-insensitive search in the "title"
    }

    const populate = [
        { path: 'creator', select: 'first_name last_name profile_picture_url' },
        { path: 'comments.creator', select: 'first_name last_name profile_picture_url' }
    ];
    // Retrieve posts based on the query
    posts = await getAllDocuments("post", query, populate);

    return NextResponse.json(posts); // Return data as JSON
}


// Create a new post
export async function POST(request: Request) {
    try {
        const body = await request.json(); // Parse request body
        if (!body) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 } // Bad Request
            );
        }
        delete body._id;
        delete body.createdDate;
        if (!body.creator) {
            return NextResponse.json(
                { message: "Creator ID is required" },
                { status: 400 } // Bad Request
            )
        }
        if( body.comments){
            body.comments = body.comments.map((comment: any)=>comment.creator = foreignKey(comment.creator._id))
        }
        body.creator = foreignKey(body.creator._id);
        if (body.communitiesIds.length === 0 || !body.communitiesIds) {
            return NextResponse.json(
                { message: "At least one community ID is required" },
                { status: 400 } // Bad Request
            )
        }
        body.communitiesIds.forEach((id: string, index: number, array: string[]) => {
            array[index] = foreignKey(id); // Update each element
        });
        // Insert into the database
        const result = await insertDocument("post", body);

        if (!result) {
            return NextResponse.json(
                { message: "Failed to create post" },
                { status: 500 } // Internal Server Error
            );
        }

        return NextResponse.json(
            { ...result._doc },
            { status: 201 } // Created
        );
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to create post" },
            { status: 500 } // Internal Server Error
        );
    }
}

