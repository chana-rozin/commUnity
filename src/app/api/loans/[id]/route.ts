import { NextResponse } from "next/server";
import {
    deleteDocumentById,
    getDocumentById,
    updateDocumentById,
    foreignKey
} from "@/services/mongoDB/mongodb";

//Get a post by ID

export async function GET(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;

    if (!id) {
        return NextResponse.json(
            { message: "Loan ID is required" },
            { status: 400 } // Bad Request
        );
    }

    const populate = [
        { path: 'borrower', select: 'first_name last_name address profile_picture_url' },
        { path: 'lender', select: 'first_name last_name address profile_picture_url' }
    ];
    // Retrieve the post from the database
    const loan = await getDocumentById('loan',id, populate);
    console.log('loan:', loan);
    
    if (!loan) {
        return NextResponse.json(
            { message: "Loan not found" },
            { status: 404 } // Not Found
        );
    }

    return NextResponse.json(loan);
}

//Patch a post by ID

export async function PATCH(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;
    const body = await request.json(); // Parse request body
    if (!body) {
        return NextResponse.json(
            { message: "Missing required fields" },
            { status: 400 } // Bad Request
        );
    }
    delete body._id
    delete body.borrower;
    if(body.lender){
        body.lender = foreignKey(body.lender._id)
    }
    if (!id) {
        return NextResponse.json(
            { message: "Loan ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Update the post in the database
    const result = await updateDocumentById("loan", id, body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update loan" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Loan updated successfully" }
    );
}


// Delete a post by ID
export async function DELETE(request: Request,{ params }: { params: Promise<{ id: string }>}) {
    let { id } = await params;


    if (!id) {
        return NextResponse.json(
            { message: "Loan ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Delete the post from the database
    const result = await deleteDocumentById("loan", id);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to delete loan" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Loan deleted successfully" }
    );
}
