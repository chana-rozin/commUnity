import { NextResponse } from "next/server";
import {
    updateDocumentById,
    getDocumentById,
    foreignKey
} from "@/services/mongoDB/mongodb";
export async function POST(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;
    if (!id) {
        return NextResponse.json(
            { message: "Community ID is required" },
            { status: 400 } // Bad Request
        );
    }
    const body = await request.json(); // Parse request body
    let community= await getDocumentById("community",id)
    if(!community){
        return NextResponse.json(
            { message: "Failed to found community" },
            { status: 404 } // Internal Server Error
        );
    }
    let user = foreignKey(body);
    let communityToUpdate = community;
    communityToUpdate.members.push(user);
    

    // Update the post in the database
    const result = await updateDocumentById("community", id, communityToUpdate);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to add user to community" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "user added to community successfully" }
    );
}

export async function DELETE(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;
    if (!id) {
        return NextResponse.json(
            { message: "Community ID is required" },
            { status: 400 } // Bad Request
        );
    }
    const body = await request.json(); // Parse request body
    let community= await getDocumentById("community",id)
    if(!community){
        return NextResponse.json(
            { message: "Failed to found community" },
            { status: 404 } // Internal Server Error
        );
    }
    let user = foreignKey(body);
    let communityToUpdate = community;
    communityToUpdate.members=communityToUpdate.members.filter((member:any) => member!==user);
    

    // Update the post in the database
    const result = await updateDocumentById("community", id, communityToUpdate);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to delete user from community" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "User deleted from community successfully" }
    );
}


