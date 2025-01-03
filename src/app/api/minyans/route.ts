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
    // const communities = searchParams.get("communities");
    // const search = searchParams.get("search");
    // const userId = searchParams.get("user_id");
    // const isOpen = searchParams.get("is_open");
    // const active = searchParams.get("active");
    let query: any = {}; // Initialize the query object
    // let loans;

    // if (communities) {
    //     // Split the communities parameter into an array
    //     const commArray = communities.split(",");
    //     // Create a query that checks both 'communitiesIds' or 'neighborhoods' field
    //     query.AuthorizedIds = { $in: commArray };
    // }

    // if (search) {
    //     query.item = { $regex: new RegExp(search, 'i') }; // Case-insensitive search in the "title"
    // }
    // if (userId) {
    //     // Ensure $or exists in the query or add it
    //     if (!query.$or) {
    //         query.$or = [];
    //     }
    //     // Add conditions for borrowerID and lenderID
    //     query.$or.push(
    //         { borrowerId: userId },
    //         { lenderId: userId }
    //     );
    // }
    // if(isOpen){
    //     if(isOpen==='true'){
    //         query.lenderId = null;
    //     }
    // }
    // if(active){
    //     query.active = active==='false'?false:true; // Only fetch active loans
    // }
    // else{
    //     query.active = true; // Default to active loans
    // }
    
    // Retrieve posts based on the query
    const minyans = await getAllDocuments("minyan", query);

    return NextResponse.json(minyans); // Return data as JSON
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
    if(!body.isRegular){
        body.membersCount=0;
    }
    else{
        body.membersCount = 10;
    }
    if(!body.AuthorizedIds){
        return NextResponse.json(
            { message: "Missing required field: AuthorizedIds" },
            { status: 400 } // Bad Request
        );
    }
    body.AuthorizedIds.forEach((id:string, index:number, array:string[]) => {
        array[index] = foreignKey(id); // Update each element
    });

       // Insert into the database
    const result = await insertDocument("minyan", body);
    if (!result) {
        return NextResponse.json(
            { message: "Failed to create minyan" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { ...body, _id: result.insertedId },
        { status: 201 } // Created
    );
}
