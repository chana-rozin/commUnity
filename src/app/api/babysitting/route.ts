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

    if (search) {
        query["requester.name"] = { $regex: new RegExp(search, "i") };
    }

    // if (active !== "false") {
    //     query.$or = [
    //         { date: { $gt: endOfDay } }, // Future date condition
    //         { 
    //             date: { $eq: startOfDay }, // Today date condition
    //             "time.end": { $gte: currentTime }, // Check if time is later than current time
    //         },
    //     ];
    // }
    

    console.log("query: ", query);

    const result = await getAllDocuments("babysitting", query);
    console.log(result);
    return NextResponse.json(result); // Return data as JSON
}

// Create a new babysitter request
export async function POST(request: Request) {
    try{
    const body = await request.json(); // Parse request body
    console.log("body: " + JSON.stringify(body));
    delete body._id;
    if(!body.requester.id){
        return NextResponse.json(
            { message: "Missing required field: requesterId" },
            { status: 400 } // Bad Request
        );
    }
    body.requesterId = foreignKey(body.requester.id);
    if(body.babysitterId){
        body.babysitterId = foreignKey(body.babysitter.id);
    }
    if(!body.AuthorizedIds||body.AuthorizedIds.length===0){
        return NextResponse.json(
            { message: "Missing required field: AuthorizedIds" },
            { status: 400 } // Bad Request
        );
    }
    body.AuthorizedIds.forEach((id:string, index:number, array:string[]) => {
        array[index] = foreignKey(id); // Update each element
    });

    // Insert into the database
    const result = await insertDocument("babysitting", body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to create babysitter request" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { ...body, _id: result._id.toString() },
        { status: 201 } // Created
    );
}catch(err){
    return NextResponse.json(
        { message: "Failed to create babysitter request"+err },
        { status: 500 } // Internal Server Error
    );
}
}



