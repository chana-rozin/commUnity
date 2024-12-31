import { NextResponse } from "next/server";
import {
    updateDocumentById,
    deleteDocumentById,
    foreignKey,
    getAllDocuments,
    getDocumentById
} from "@/services/mongoDB/mongodb";
import { useParams } from "next/navigation";


export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    let { id } = await params;
    const body = await request.json(); // Parse request body
    if (!body) {
        return NextResponse.json(
            { message: "Missing required fields" },
            { status: 400 } // Bad Request
        );
    }
    delete body._id
    delete body.requester;
    if (body.babysitter) {
        body.babysitter = foreignKey(body.babysitter);
    }
    if (!id) {
        return NextResponse.json(
            { message: "Request ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Update the post in the database
    const result = await updateDocumentById("babysitting", id, body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update loan" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Request updated successfully" }
    );
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        let { id } = await params;

        const populate = [
            { path: 'requester', select: '_id first_name last_name profile_picture_url' },
            { path: 'babysitter', select: '_id first_name last_name profile_picture_url' }
        ];

        const result = await getDocumentById("babysitting", id, populate);
        console.log(result);
        return NextResponse.json(result); // Return data as JSON

    }
    catch (error) {
        return NextResponse.json({ message: "Error getting user's requests" }, { status: 400 });
    }
}
// Update a babysitter request by ID
// export async function PUT(request: Request) {
//     const url = new URL(request.url);
//     const id = url.searchParams.get("id"); // Extract babysitter request ID from query string
//     const body = await request.json(); // Parse request body

//     if (!id) {
//         return NextResponse.json(
//             { message: "Babysitter request ID is required" },
//             { status: 400 } // Bad Request
//         );
//     }

//     // Update the babysitter request in the database
//     const result = await updateDocumentById("Babysitting", id, body);

//     if (!result) {
//         return NextResponse.json(
//             { message: "Failed to update babysitter request" },
//             { status: 500 } // Internal Server Error
//         );
//     }

//     return NextResponse.json(
//         { message: "Babysitter request updated successfully" }
//     );
// }

// Delete a babysitter request by ID
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json(
            { message: "Babysitter request ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Delete the babysitter request from the database
    const result = await deleteDocumentById("babysitting", id);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to delete babysitter request" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Babysitter request deleted successfully" }
    );
}
