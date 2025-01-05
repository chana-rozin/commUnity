import { NextResponse } from "next/server";
import {
    updateDocumentById,
    getDocumentById,
    foreignKey
} from "@/services/mongoDB/mongodb";
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string, userId: string }> }) {
    let { id } = await params;
    if (!id) {
        return NextResponse.json(
            { message: "Community ID is required" },
            { status: 400 } // Bad Request
        );
    }
    let { userId } = await params;
    if (!userId) {
        return NextResponse.json(
            { message: "User ID is required" },
            { status: 400 } // Bad Request
        );
    }
    let community = await getDocumentById("community", id)
    if (!community) {
        return NextResponse.json(
            { message: "Failed to found community" },
            { status: 404 } // Internal Server Error
        );
    }
    let communityToUpdate = community;
    const communitiesMembers = communityToUpdate.members.filter((mem: any) => (mem).toString() !== userId)
    communityToUpdate.members = communitiesMembers;


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


