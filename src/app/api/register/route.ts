import { NextResponse } from "next/server";
import {
    getAllDocuments,
    insertDocument,
    updateDocumentById,
    deleteDocumentById
} from "@/services/mongodb"; 

export async function POST (request: Request){
    
}