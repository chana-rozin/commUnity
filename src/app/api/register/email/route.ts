import { NextResponse } from "next/server";
import { insertDocument, foreignKey } from "@/services/mongoDB/mongodb";
import { hashVerificationCode } from '@/services/crypto'
import { generateToken } from '@/services/tokens'

// Create a new post
export async function POST(request: Request) {
    try {
        const body = await request.json(); // Parse request body
        console.log(body);
        const { password, email, communitiesIds, neighborhoodId } = body;
        const hashPassword = await hashVerificationCode(password);
        const passwordToSave:any =  { password: hashPassword, email: email };
        const savePasswordAtDb = await insertDocument("password", passwordToSave);
        if (!savePasswordAtDb) {
            return NextResponse.json(
                { message: "Failed to save password at database" },
                { status: 500 } // Internal Server Error
            );
        }
        delete body.password;
        // Insert into the database
        delete body._id;
        if (!body.neighborhoodId) {
            return NextResponse.json(
                { message: "Missing neighborhoodId" },
                { status: 400 } // Bad Request
            );
        }
        body.neighborhoodId = foreignKey(body.neighborhoodId);
        if (!body.communitiesIds || body.communitiesIds.length > 0) {
            body.communitiesIds.forEach((id: string, index: number, array: string[]) => {
                array[index] = foreignKey(id); // Update each element
            });
        }
        const result = await insertDocument("user", body);

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

        const id = result.insertedId.toString();
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

