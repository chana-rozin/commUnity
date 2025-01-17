import { NextResponse } from "next/server";
import { getAllDocuments } from "@/services/mongoDB/mongodb";


// Create a new post
export async function POST(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    
    let { id } = await params;
    const query = {
        email: id
    }
    const populate = [
        { path: 'neighborhood', select: 'name' },
        { path: 'communities', select: 'name' }
    ];
    const userExists = await getAllDocuments('user', query, populate);
    if (userExists.length === 0) {
        return NextResponse.json(
            { message: "Email not exists" },//not alowwed
            { status: 400}
        );
    }
    return NextResponse.json(
        { message: "This is a new user" },
        { status: 200 } 
    )

}

