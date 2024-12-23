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
    const userId = searchParams.get("user_id");
    const isOpen = searchParams.get("is_open");
    const active = searchParams.get("active");
    let query: any = {}; // Initialize the query object
    let loans;

    if (communities) {
        // Split the communities parameter into an array
        const commArray = communities.split(",");
        // Create a query that checks both 'communitiesIds' or 'neighborhoods' field
        query.AuthorizedIds = { $in: commArray };
    }

    if (search) {
        query.item = { $regex: new RegExp(search, 'i') }; // Case-insensitive search in the "title"
    }
    if (userId) {
        // Ensure $or exists in the query or add it
        if (!query.$or) {
            query.$or = [];
        }
        // Add conditions for borrower ID and lenderID
        query.$or.push(
            { borrower: userId },
            { lender: userId }
        );
    }
    if(isOpen){
        if(isOpen==='true'){
            query.lender = null;
        }
        else{
            query.lender = { $ne: null }; // Fetch loans that are not lent out
        }
    }
    if(active){
        query.active = active==='false'?false:true; // Only fetch active loans
    }
    else{
        query.active = true; // Default to active loans
    }
    const populate = [
        { path: 'borrower', select: 'first_name last_name address profile_picture_url' },
        { path: 'lender', select: 'first_name last_name address profile_picture_url' }
    ];
    
    // Retrieve posts based on the query
    loans = await getAllDocuments("loan", query, populate);
    console.log(loans);
    
    return NextResponse.json(loans); // Return data as JSON
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
    delete body.createdDate;
    if(!body.borrower){
        return NextResponse.json(
            { message: "Borrower ID is required" },
            { status: 400 } // Bad Request
        )
    }
    body.borrower = foreignKey(body.borrower);
    if(!body.AuthorizedIds){
        return NextResponse.json(
            { message: "Authorized IDs are required" },
            { status: 400 } // Bad Request
        )
    }
    body.AuthorizedIds.forEach((id:string, index:number, array:string[]) => {
        array[index] = foreignKey(id); // Update each element
    });
    if(body.lender){
        body.lender = foreignKey(body.lender._id);
    }
    // Insert into the database
    const result = await insertDocument("loan", body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to create loan" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { ...body, _id: result._id.toString() },
        { status: 201 } // Created
    );
}

