import { NextResponse } from "next/server";
import {
    insertDocument,
    getAllDocuments,
    foreignKey,
} from "@/services/mongoDB/mongodb";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const communities = searchParams.get("communities");
    const userId = searchParams.get("user_id");
    let query: any = {}; // Initialize the query object
    let communitiesResult;

    if (communities) {
        // Split the communities parameter into an array
        const commArray = communities.split(",");
        // Create a query that checks both 'communitiesIds' or 'neighborhoods' field
        query.communitiesIds = { $in: commArray };
    }
    if(userId) {
        query.members = { $in:[foreignKey(userId)]};
    }

    const populate = [
        { path: 'members', select: 'first_name last_name profile_picture_url' }
    ];
    // Retrieve posts based on the query
    communitiesResult = await getAllDocuments("community", query, populate);

    return NextResponse.json(communitiesResult); // Return data as JSON
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
        body.members[0]=foreignKey(body.members[0]._id);
        body.main = false;
        
        // Insert into the database
        const result = await insertDocument("community", body);

        if (!result) {
            return NextResponse.json(
                { message: "Failed to create community" },
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
            { message: "Failed to create community" },
            { status: 500 } // Internal Server Error
        );
    }
}

