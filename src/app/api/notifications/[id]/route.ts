import { updateDocumentById } from "@/services/mongoDB/mongodb";
import { getDocumentByQuery } from "@/services/mongoDB/mongodbV1";
import { NextResponse } from "next/server";
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    let { id } = await params;


    if (!id) {
        return NextResponse.json(
            { message: "Loan ID is required" },
            { status: 400 } // Bad Request
        );
    }
    const query = {
        notifications: {
            $elemMatch: { _id: id }
        }
    }
    const users = await getDocumentByQuery("user", query);
    if(users.length===0){
        return NextResponse.json(
            { message: "Loan not found" },
            { status: 404 } // Not Found
        );
    }
    let user = users[0];
    user.notifications = user.notifications.filter((notification:any)=> notification._id!== id);
    const query2:any ={ 
        notifications: user.notifications
    }
    const updateUser = await updateDocumentById("user", user._id.toString(),query2)
    if (!updateUser) {
        return NextResponse.json(
            { message: "Failed to delete notification" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Notification deleted successfully" }
    );
}