import { NextResponse } from "next/server";
import {
    getAllDocuments,
    insertDocument,
    foreignKey
} from "@/services/mongoDB/mongodb";
import { neighborhood } from "@/services/mongoDB/models";

// Fetch all posts
export async function GET(request: Request) {
    const users = await getAllDocuments("user"); // Retrieve all posts
    if (!users) {
        return NextResponse.json(
            { message: "Failed to found users" },
            { status: 500 } // Internal Server Error
        );
    }
    return NextResponse.json(users, { status: 200 }); // Return data as JSON
}

// Create a new post
export async function POST(request: Request) {
    const body = await request.json(); // Parse request body
    console.log(body);
    delete body._id;
    if(!body.neighborhoodId){
        return NextResponse.json(
            { message: "Missing neighborhoodId" },
            { status: 400 } // Bad Request
        );
    }
    body.neighborhoodId = foreignKey(body.neighborhoodId);
    if(!body.communitiesIds||body.communitiesIds.length > 0){
        body.communitiesIds.forEach((id:string, index:number, array:string[]) => {
            array[index] = foreignKey(id); // Update each element
        });
    }
    if(!body.savedPostsIds||body.savedPostsIds.length > 0){
        body.savedPostsIds.forEach((id:string, index:number, array:string[]) => {
            array[index] = foreignKey(id); // Update each element
        });
    }
    if(!body.savedEventsIds||body.savedEventsIds.length > 0){
        body.savedEventsIds.forEach((id:string, index:number, array:string[]) => {
            array[index] = foreignKey(id); // Update each element
        });
    }
    // Insert into the database
    const result = await insertDocument("user", body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to create user" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { ...body, _id: result.insertedId },
        { status: 201 } // Created
    );
}

