import { NextResponse } from "next/server";
import { getDocumentById} from "@/services/mongoDB/mongodb";

export async function GET(request: Request, { params }: {params: Promise<{ id: string }>}){
    try{
    const { id } = await params;
    console.log("get neighborhood: ", id);
    const neighborhood = await getDocumentById("neighborhood",id);
    if(!neighborhood)
        throw new Error;
    return NextResponse.json(neighborhood);

    }catch{
        console.log("Error getting neighborhood ")
        return NextResponse.json(
            { message: "Failed to fetch neighborhood" },
            { status: 500 }
        );
    }
}