import { NextResponse } from "next/server";
import {
    getAllDocuments,
    insertDocument,
    getDocumentByQuery
} from "@/services/mongodb";

// Fetch all babysitter requests
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const communities = searchParams.get("communities")?.split(",");
    const search = searchParams.get("search");
    const active = searchParams.get("active");
    let query: any = {};
    const today = new Date();

    if (communities) {
        query.AuthorizedIds = { $in: communities };
    }

    if (search) {
        query["requester.name"] = { $regex: new RegExp(search, "i") };
    }

    if (active !== "false") {
        query.$or = [
            { date: { $gt: new Date(today.setHours(23, 59, 59, 999)) } },
            {
                date: { $eq: new Date(today.setHours(0, 0, 0, 0)) },
                "time.end": { $gte: `${today.getHours()}:${today.getMinutes()}` },
            },
        ];
    }

    const result = await getDocumentByQuery("babysittings", query);
    console.log(result);
    return NextResponse.json(result); // Return data as JSON
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



