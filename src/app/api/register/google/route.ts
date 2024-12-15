import { NextResponse } from "next/server";
import { insertDocument, getDocumentByQuery, patchDocumentById, getDocumentById } from "@/services/mongodb";
import { generateToken } from '@/services/tokens';
import { auth } from '@/services/firebaseAdmin';

// Create a new post
export async function POST(request: Request) {
    debugger
    try {
        const body = await request.json(); // Parse request body
        const { accessToken, email, communitiesIds } = body;

        // Verify the token with Firebase
        const decodedToken = await auth.verifyIdToken(accessToken);
        console.log('Decoded token:', decodedToken);

        delete body.accessToken;

        const query = {
            city: body.address.city,
            name: body.address.neighborhood
        }
        let neighborhood: any = await getDocumentByQuery("neighborhoods", query);
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
            if (!addNeighborhoodResult) {
                return NextResponse.json(
                    { message: "Failed to add user's neighborhood" },
                    { status: 500 }
                );
            }
            body.neighborhoodId = addNeighborhoodResult.insertedId.toString();
        }
        const result = await insertDocument("users", body);
        if (!result) {
            return NextResponse.json(
                { message: "Failed to create user" },
                { status: 500 }
            );
        }
        if (neighborhood.length === 0) {
            const getNeighborhood = await getDocumentById("neighborhoods", body.neighborhoodId);
            if (!getNeighborhood) {
                return NextResponse.json(
                    { message: "Failed to find user's neighborhood" },
                    { status: 500 }
                );
            }
            neighborhood.push(getNeighborhood);
        }
        console.log(neighborhood[0]);

        let updateNeighborhood: any = neighborhood[0];
        if (!(updateNeighborhood.streets.includes(body.address.street))) {
            updateNeighborhood.streets.push(body.address.street);
        }
        updateNeighborhood.membersId.push(result.insertedId.toString())
        const updateNeighborhoodResult = await patchDocumentById("neighborhoods", neighborhood[0]._id.toString(), updateNeighborhood);
        if(!updateNeighborhoodResult){
            return NextResponse.json(
                { message: "Failed to update user's neighborhood" },
                { status: 500 }
            );
        }
        // Insert into the database


        const id = result.insertedId.toString();
        // Generate token
        const token = generateToken(id, communitiesIds, body.neighborhoodId);

        // Respond with token in httpOnly cookie
        const response = NextResponse.json(
            { insertedId: id },
            { status: 201 },
        );

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 // 1 week in seconds
        });

        return response;
    } catch (error: any) {
        console.error('Error in POST handler:', error);
        return NextResponse.json(
            { message: "Invalid token or other error occurred", error: error.message },
            { status: 401 }
        );
    }
}
