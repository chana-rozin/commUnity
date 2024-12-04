import { NextResponse } from "next/server";
import { getDocumentByQuery} from "@/services/mongodb";
import {ObjectId} from 'mongodb'

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const searchQuery = url.searchParams.get('ids')?.split(',').map(id=>new ObjectId(id));
        const query = {
            "_id": { $in: searchQuery }
        }
        const communities = await getDocumentByQuery("communities", query);
        return NextResponse.json(communities)
    } catch (err) {
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }
}