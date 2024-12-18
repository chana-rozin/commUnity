import { NextResponse } from "next/server";
import { insertDocument , updateDocumentById, getAllDocuments , getDocumentById, foreignKey} from "@/services/mongoDB/mongodb";
import { hashVerificationCode } from '@/services/crypto'
import { generateToken } from '@/services/tokens'

// Create a new post
export async function POST(request: Request) {
    debugger
    try {
        const body = await request.json(); // Parse request body
        console.log(body);
        const { password, email, communitiesIds, neighborhoodId } = body;
        const hashPassword = await hashVerificationCode(password);
        const passToInsert:any = { password: hashPassword, email: email }
        const savePasswordAtDb = await insertDocument("password",passToInsert );
        if (!savePasswordAtDb) {
            return NextResponse.json(
                { message: "Failed to save password at database" },
                { status: 500 } // Internal Server Error
            );
        }
        delete body.password;
        // Insert into the database


        const query = {
            city: body.address.city,
            name: body.address.neighborhood
        }
        let neighborhood: any = await getAllDocuments("neighborhood", query);
        if (neighborhood.length > 0) {
            body.neighborhoodId = neighborhood[0]._id;
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
            body.neighborhoodId = addNeighborhoodResult._id;
        }
        const result = await insertDocument("user", body);
        if (!result) {
            return NextResponse.json(
                { message: "Failed to create user" },
                { status: 500 }
            );
        }
        if (neighborhood.length === 0) {
            const getNeighborhood = await getDocumentById("neighborhood", body.neighborhoodId);
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

        const id = result._id.toString();
        //Generate token
        const token = generateToken(id, communitiesIds, neighborhoodId);
        //response with token in httpOnly:
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

