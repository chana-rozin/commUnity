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
    if(communityToUpdate.members.includes(user)){
        return NextResponse.json(
            { message: "User is already a member of the community" },
            { status: 400 } // Bad Request
        );
    }
    communityToUpdate.members.push(user);
    const updateUser = await getDocumentById("user", body);
    if(!updateUser){
        return NextResponse.json(
            { message: "Failed to found user" },
            { status: 404 } // Internal Server Error
        );
    }  
    updateUser.communities.push(foreignKey(id));
    const query:any ={
        communities: updateUser.communities
    }
    const updateUserResult = await updateDocumentById("user", body, query);
    if(!updateUserResult){
        return NextResponse.json(
            { message: "Failed to update user communities" },
            { status: 500 } // Internal Server Error
        );
    }

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
