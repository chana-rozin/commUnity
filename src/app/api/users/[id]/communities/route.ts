import { NextResponse } from "next/server";
import { getAllDocuments } from "@/services/mongoDB/mongodb";
import { ObjectId } from 'mongodb'
import { verifyToken } from "@/services/tokens";
import { cookies } from "next/headers";


export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const searchQuery = url.searchParams.get('ids')?.split(',').map(id => new ObjectId(id));
        const query = {
            "_id": { $in: searchQuery }
        }
        const cookieStore = await cookies(); // Access cookie storage
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized: No token found in cookies" },
                { status: 401 }
            );
        }
        const decoded = verifyToken(token);

        // Access decoded properties
        console.log("User ID:", decoded.role.id);
        console.log("Authorized Communities:", decoded.role.communitiesIds);
        console.log("Neighborhood ID:", decoded.role.neighborhoodId);
        const communities = await getAllDocuments("community", query);
        return NextResponse.json(communities)
    } catch (err) {
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }
}