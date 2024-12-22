import { NextResponse } from "next/server";
import { getAllDocuments } from "@/services/mongoDB/mongodb";
import { ObjectId } from 'mongodb'
import { verifyToken } from "@/services/tokens";
import { cookies } from "next/headers";


export async function GET(request: Request) {
    try {
        console.log("users/id/communities");
        const url = new URL(request.url);
        const searchQuery = url.searchParams.get('ids');
        console.log("search query: ", searchQuery);
        
        const cookieStore = await cookies(); // Access cookie storage
        const token = cookieStore.get("token")?.value;
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized: No token found in cookies" },
                { status: 401 }
            );
        }
        const decoded = verifyToken(token);

        const searchQueryArr = searchQuery&&searchQuery.length
        ?searchQuery.split(',').map(id => new ObjectId(id))
        :[decoded.role.neighborhoodId, ...decoded.role.communitiesIds];

        const query = {
            "_id": { $in: searchQueryArr}
        }

        // Access decoded properties
        console.log("User ID:", decoded.role.id);
        console.log("Authorized Communities:", decoded.role.communitiesIds);
        console.log("Neighborhood ID:", decoded.role.neighborhoodId);
        const communities = await getAllDocuments("community", query);
        console.log("Communities: ", communities);
        return NextResponse.json(communities)
    } catch (err) {
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }
}