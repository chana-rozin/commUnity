import { NextResponse } from "next/server";
import {
    getAllDocuments,
    insertDocument,
    foreignKey
} from "@/services/mongoDB/mongodb";

// Fetch all posts
export async function GET(request: Request) {
    debugger
    const query = {}
    const populate = [
        { path: 'neighborhood', select: 'name' },
        { path: 'communities', select: 'name' }
    ];
    const users = await getAllDocuments("user", query, populate); // Retrieve all posts
    if (!users) {
        return NextResponse.json(
            { message: "Failed to found users" },
            { status: 500 } // Internal Server Error
        );
    }
    return NextResponse.json(users, { status: 200 }); // Return data as JSON
}



