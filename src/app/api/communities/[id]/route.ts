import { NextResponse } from "next/server";
import {
    updateDocumentById,
    getDocumentById,
    getAllDocuments
} from "@/services/mongoDB/mongodb";

//Get a post by ID

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
  ) {
    try {
      // Get communities where the user is a member
      const query = {
        membersId: { $in: [params.userId] }
      };
      const communities = await getAllDocuments("community", query);
      return NextResponse.json(communities);
    } catch (error) {
      console.error("Error fetching user communities:", error);
      return NextResponse.json(
        { message: "Failed to fetch communities" },
        { status: 500 }
      );
    }
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


