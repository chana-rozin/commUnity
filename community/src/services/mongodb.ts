
import { MongoClient, ObjectId } from "mongodb";

let client: MongoClient;

export async function connectDatabase() {
    if (!client) {
        const dbConnectionString = process.env.DB_CONNECTION;
        if (!dbConnectionString) {
            throw new Error('Database connection string is not defined');
        }
        client = new MongoClient(dbConnectionString);
        await client.connect();
    }
    console.log('Database connection');
}

export async function insertDocument(collection: string, document: object) {
    const db = client.db('commUnity');
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getAllDocuments(collection: string) {
    const db = client.db('commUnity');
    const documents = await db.collection(collection).find().toArray();
    console.log('documents:', documents);
    return documents;
}

export async function updateDocument(collection: string, id: string, document: object) {
    const db = client.db('commUnity');
    const result = await db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: document });
    return result;
}

export async function deleteDocument(collection: string, id: string) {
    const db = client.db('commUnity');
    const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
    return result;
}

connectDatabase();