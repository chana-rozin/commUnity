import { NextResponse } from "next/server";
import {
    insertDocument,
    foreignKey,
    getAllDocuments
} from "@/services/mongoDB/mongodb";

// Fetch all babysitter requests
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const communities = searchParams.get("communities")?.split(",");
    console.log("communities: ", communities);
    const search = searchParams.get("search");
    const active = searchParams.get("active");
    let query: any = {};

    const today = new Date();
    const endOfDay = new Date(today); // Clone `today`
    endOfDay.setHours(23, 59, 59, 999); // End of day

    const startOfDay = new Date(today); // Clone `today`
    startOfDay.setHours(0, 0, 0, 0); // Start of day

    const currentTime = `${today.getHours()}:${today.getMinutes()}`;

    if (communities) {
        query.AuthorizedIds = { $in: communities };
    }

    // if (search) {
    //     query["requester.name"] = { $regex: new RegExp(search, "i") };
    // }

    if (active !== "false") {
        query.$or = [
            { date: { $gt: endOfDay } }, // Future date condition
            {
                date: { $eq: startOfDay }, // Today date condition
                "time.end": { $gte: currentTime }, // Check if time is later than current time
            },
        ];
    }


    console.log("query: ", query);
    const populate = [
        { path: 'requester', select: '_id first_name last_name profile_picture_url' },
        { path: 'babysitter', select: '_id first_name last_name profile_picture_url' }
    ];
    console.log('Populate:', populate);
    const result = await getAllDocuments("babysitting", query, populate);
    console.log(result);
    return NextResponse.json(result); // Return data as JSON
}

// Create a new babysitter request
export async function POST(request: Request) {
    try {
        const body = await request.json(); // Parse request body
        console.log("body: " + JSON.stringify(body));
        delete body._id;
        if (!body.requester._id) {
            return NextResponse.json(
                { message: "Missing required field: requesterId" },
                { status: 400 } // Bad Request
            );
        }
        body.requester = foreignKey(body.requester.id);
        if (body.babysitter) {
            body.babysitter = foreignKey(body.babysitter.id);
        }
        if (!body.AuthorizedIds || body.AuthorizedIds.length === 0) {
            return NextResponse.json(
                { message: "Missing required field: AuthorizedIds" },
                { status: 400 } // Bad Request
            );
        }
        body.AuthorizedIds.forEach((id: string, index: number, array: string[]) => {
            array[index] = foreignKey(id); // Update each element
        });
        console.log("before saving to db")
        // Insert into the database
        const result = await insertDocument("babysitting", body);

        return NextResponse.json(
            { ...body, _id: result._id.toString() },
            { status: 201 } // Created
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Failed to create babysitter request" + err },
            { status: 500 } // Internal Server Error
        );
    }
}



