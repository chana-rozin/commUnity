import { NextResponse } from "next/server";
import { foreignKey, getDocumentById, updateDocumentById } from "@/services/mongoDB/mongodb";


// Create a new post
export async function POST(request: Request) {
    try {
        const body = await request.json(); // Parse request body
        if (!body) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 } // Bad Request
            ); 
        }
        const receiver = await getDocumentById("user", body.receiverId);
        if(!receiver) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 } // Not Found
            );
        }
        let updatedReceiver = receiver;
        let notification = {
            _id: Date.now().toString(),
            message: body.message,
            sender: foreignKey(body.sender._id),
            urgencyLevel: body.urgencyLevel,
            type: body.type,
            subject: {
                _id: foreignKey(body.subject._id),
                type: body.subject.type
            }
        }
        updatedReceiver.notifications.push(notification);
        const query:any = {
            notifications: updatedReceiver.notifications
        }
        const updatedUser = await updateDocumentById("user",body.receiverId,query);
        if(!updatedUser) {
            return NextResponse.json(
                { message: "Failed to update user's notifications" },
                { status: 500 } // Internal Server Error
            );
        }
        return NextResponse.json(
            { message: "Notification added successfully" },
            { status: 201 } // Created
        );
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to create notification" },
            { status: 500 } // Internal Server Error
        );
    }
}

