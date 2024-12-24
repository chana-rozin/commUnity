import { NextResponse } from "next/server";
import { foreignKey, getDocumentById, updateDocumentById } from "@/services/mongoDB/mongodb";
import { UrgencyLevel } from "@/types/general.type";


// Create a new post
export async function POST(request: Request) {
    debugger 
    try {
        const body = await request.json(); // Parse request body
        if (!body) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 } // Bad Request
            ); 
        }
        delete body._id;
        if(!body.receiverId){
            return NextResponse.json(
                { message: "Receiver ID is required" },
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
        const notificationId = Date.now().toString();
        let notification = {
            _id: notificationId,
            message: body.message,
            sender: foreignKey(body.sender._id),
            urgencyLevel: body.urgencyLevel? body.urgencyLevel: UrgencyLevel.Low,
            type: body.type,
            subject: {
                _id: foreignKey(body.subject._id),
                type: body.subject.type
            }
        }
        receiver.notifications.push(notification);
        const query:any = {
            notifications: receiver.notifications
        }
        console.log(receiver.notifications, Object.values(UrgencyLevel));
        
        const updatedUser = await updateDocumentById("user",body.receiverId,query);
    
        if(!updatedUser) {
            return NextResponse.json(
                { message: "Failed to update user's notifications" },
                { status: 500 } // Internal Server Error
            );
        }
        const populate ={
            path: "notifications.sender",
            select: "_id first_name last_name",
        }
        const userWithPopulate = await getDocumentById("user",body.receiverId,populate );
        if(!userWithPopulate){
            return NextResponse.json(
                { message: "Failed to retrieve user with notifications" },
                { status: 500 } // Internal Server Error
            );
        }
        const notificationToSend = userWithPopulate.notifications.find((notification:any)=>
            notification._id === notificationId
        )
        return NextResponse.json({
            message: "Notification added successfully",
            ...notificationToSend
        }, { status: 201 });

    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to create notification" },
            { status: 500 } // Internal Server Error
        );
    }
}


