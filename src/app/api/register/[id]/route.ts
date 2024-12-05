import { NextResponse } from "next/server";
import { getDocumentByQuery } from "@/services/mongodb";


// Create a new post
export async function POST(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    
    let { id } = await params;
    const query = {
        email: id
    }
    const userExists = await getDocumentByQuery('users', query);
    if (userExists.length > 0) {
        return NextResponse.json(
            { message: "Email already exists" },
            { status: 409 } // Conflict
        );
    }
    return NextResponse.json(
        { message: "This is a new user" },
        { status: 200 } 
    )

}

