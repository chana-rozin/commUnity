import connectToDB from "@/services/mongoDB/mongoInit";
export async function GET(){
    connectToDB();
    return { statusCode: 200, body: "Connected to MongoDB" };
}