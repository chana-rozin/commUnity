import { NextResponse } from "next/server";
import { foreignKey, getDocumentById, updateDocumentById } from "@/services/mongoDB/mongodb";
import { UrgencyLevel } from "@/types/general.type";


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
        delete body._id;
        if (!body.receiverId) {
            return NextResponse.json(
                { message: "Receiver ID is required" },
                { status: 400 } // Bad Request
            );
        }
        const receiver = await getDocumentById("user", body.receiverId);
        if (!receiver) {
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
            urgencyLevel: body.urgencyLevel ? body.urgencyLevel : UrgencyLevel.Low,
            type: body.type,
            subject: {
                _id: foreignKey(body.subject._id),
                type: body.subject.type
            }
        }
        receiver.notifications.push(notification);
        const query: any = {
            notifications: receiver.notifications
        }
        console.log(receiver.notifications, Object.values(UrgencyLevel));

        const updatedUser = await updateDocumentById("user", body.receiverId, query);

        if (!updatedUser) {
            return NextResponse.json(
                { message: "Failed to update user's notifications" },
                { status: 500 } // Internal Server Error
            );
        }

        const sender = await updateDocumentById("user", body.sender._id, query);
        if (!sender) {
            return NextResponse.json(
                { message: "Failed to update sender's notifications" },
                { status: 500 } // Internal Server Error
            );
        }
        const notificationToSend = notification;
        notificationToSend.sender = { _id: notificationToSend.sender._id.toString(), first_name: sender.first_name, last_name: sender.last_name }
        console.log(notificationToSend);

        return NextResponse.json({
            notification: { ...notificationToSend }
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


