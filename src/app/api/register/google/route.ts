import { NextResponse } from "next/server";
import { insertDocument, getAllDocuments, updateDocumentById, getDocumentById, foreignKey } from "@/services/mongoDB/mongodb";
import { generateToken } from '@/services/tokens';
import { auth } from '@/services/firebaseAdmin';

// Create a new post
export async function POST(request: Request) {
    try {
        const body = await request.json(); // Parse request body
        const { accessToken } = body;
        body.communities=[];
        // Verify the token with Firebase
        const decodedToken = await auth.verifyIdToken(accessToken);
        console.log('Decoded token:', decodedToken);

        delete body.accessToken;

        const query = {
            city: body.address.city,
            name: body.address.neighborhood
        }
        let neighborhood: any = await getAllDocuments("neighborhood", query);
        if (neighborhood.length > 0) {
            body.neighborhood = neighborhood[0]._id;
        }
        else {
            const newNeighborhood:any = {
                country: body.address.country,
                city: body.address.city,
                name: body.address.neighborhood,
                streets: [],
                membersId: []
            }
            const addNeighborhoodResult = await insertDocument("neighborhood", newNeighborhood);
            if (!addNeighborhoodResult) {
                return NextResponse.json(
                    { message: "Failed to add user's neighborhood" },
                    { status: 500 }
                );
            }
            body.neighborhood = addNeighborhoodResult._id;
        }
        const result = await insertDocument("user", body);
        if (!result) {
            return NextResponse.json(
                { message: "Failed to create user" },
                { status: 500 }
            );
        }
        if (neighborhood.length === 0) {
            const getNeighborhood = await getDocumentById("neighborhood", body.neighborhood);
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
        updateNeighborhood.membersId.push(result._id);
        const updateNeighborhoodResult = await updateDocumentById("neighborhood", neighborhood[0]._id.toString(), updateNeighborhood);
        if(!updateNeighborhoodResult){
            return NextResponse.json(
                { message: "Failed to update user's neighborhood" },
                { status: 500 }
            );
        }
        // Insert into the database

        const id = result._id.toString();
        body._id = id;
        // Generate token
        const token = generateToken(id, [], body.neighborhood.toString());
        body.neighborhood = {_id:body.neighborhood.toString(), name:body.address.neighborhood}; 

        // Respond with token in httpOnly cookie
        const response = NextResponse.json(
            { ...body },
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
