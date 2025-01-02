import { NextResponse } from "next/server";
import {
    updateDocumentById,
    getDocumentById
} from "@/services/mongoDB/mongodb";

//Get a post by ID

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    debugger
    let { id } = await params;

    if (!id) {
        return NextResponse.json(
            { message: "Community ID is required" },
            { status: 400 } // Bad Request
        );
    }
    const populate = [
        { path: 'members', select: 'first_name last_name profile_picture_url' }
    ];
    // Retrieve the post from the database
    const community = await getDocumentById('community', id, populate);

    if (!community) {
        return NextResponse.json(
            { message: "Community not found" },
            { status: 404 } // Not Found
        );
    }
    const communityToSend = community._doc;

    communityToSend._id = communityToSend._id.toString();

    return NextResponse.json(communityToSend);
}

//Patch a post by ID

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    let { id } = await params;
    const body = await request.json(); // Parse request body
    if (!body) {
        return NextResponse.json(
            { message: "Missing required fields" },
            { status: 400 } // Bad Request
        );
    }
    if (!id) {
        return NextResponse.json(
            { message: "Community ID is required" },
            { status: 400 } // Bad Request
        );
    }
    delete body._id;
    const getCommunity = await getDocumentById("community",id);
    if(!getCommunity) {
        return NextResponse.json(
            { message: "Failed to found community" },
            { status: 404 } // Internal Server Error
        );
    }
    if(getCommunity.main){
        delete body.name;
    }
    const query:any = {
    }
    if(body.name){
        query.name = body.name;
    }
    if(body.description){
        query.description = body.description;
    }
    if(body.imageUrl){
        query.imageUrl = body.imageUrl;
    }
    // Update the community in the database
    const result = await updateDocumentById("community", id, body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update community" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Community updated successfully" }
    );
}


