import connectToDB from "@/services/mongoDB/mongoInit";
import { NextResponse } from "next/server";
export async function GET(){
    connectToDB();
    return NextResponse.json(
        {
            message: "OK",
        }
    )
}