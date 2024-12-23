import { NextResponse } from "next/server";
import {
    getAllDocuments,
    insertDocument,
    foreignKey
} from "@/services/mongoDB/mongodb";

// Fetch all ads
export async function GET(request: Request) {
    const ads = await getAllDocuments("ad"); // Retrieve all ads
    return NextResponse.json(ads); // Return data as JSON
}

// Create a new ad
export async function POST(request: Request) {
    const body = await request.json();
    if(!body.AuthorizedIds){
        return NextResponse.json(
            { message: "Missing required field: AuthorizedIds" },
            { status: 400 } // Bad Request
        );
    }
    body.AuthorizedIds.forEach((id:string, index:number, array:string[]) => {
        array[index] = foreignKey(id); // Update each element
    });
    delete body._id; // Remove unnecessary field

    try {
        const result = await insertDocument("ad", body);

        return NextResponse.json(
            { ...body, _id: result._id.toString() },
            { status: 201 } // Created
        );
    } catch (error) {
        // Narrow the type of `error` to handle it
        if (error instanceof Error) {
            // Access `error.message`
            return NextResponse.json(
                { message: error.message || "Failed to create ad" },
                { status: 400 } // Bad Request
            );
        } else {
            // Handle unexpected error types
            return NextResponse.json(
                { message: "An unknown error occurred" },
                { status: 500 } // Internal Server Error
            );
        }
    }
}


