import { NextResponse } from "next/server";
import {
    getAllDocuments,
    insertDocument,
    getDocumentByQuery,
    patchDocumentById
} from "@/services/mongodb";

// Fetch all posts
export async function GET(request: Request) {
    const users = await getAllDocuments("users"); // Retrieve all posts
    if (!users) {
        return NextResponse.json(
            { message: "Failed to found users" },
            { status: 500 } // Internal Server Error
        );
    }
    return NextResponse.json(users, { status: 200 }); // Return data as JSON
}

// Create a new post
export async function POST(request: Request) {
    
    debugger
    const body = await request.json(); // Parse request body
    console.log(body);
    delete body._id;

    //(TODO: check validation of neighborhood)

    const query = {
        city: body.address.city,
        name: body.address.neighborhood
    }
    let neighborhood = await getDocumentByQuery("neighborhoods", query);
    if (neighborhood.length > 0) {
        body.neighborhoodId = neighborhood[0]._id.toString();
    } 
    else {
        const newNeighborhood = {
            city: body.address.city,
            name: body.address.neighborhood,
            streets: [],
            membersId: []
        }
        const addNeighborhoodResult = await insertDocument("neighborhoods", newNeighborhood);
        body.neighborhoodId=addNeighborhoodResult.insertedId.toString();
    }
    const result = await insertDocument("users", body);
    if (neighborhood.length === 0) {
        neighborhood = await getDocumentByQuery("neighborhoods", query)
    }
    let updateNeighborhood: any = {};
    if (!(neighborhood[0].membersId.includes(body.address.street))) {
        updateNeighborhood.streets.push(body.address.street);
    }
    updateNeighborhood.membersId.push(result.insertedId.toString())
    const updateNeighborhoodResult = await patchDocumentById("neighborhoods", neighborhood[0]._id.toString() , updateNeighborhood);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to create user" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { ...body, _id: result.insertedId },
        { status: 201 } // Created
    );
}

