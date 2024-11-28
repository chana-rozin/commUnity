
import { MongoClient, ObjectId } from "mongodb";

let client: MongoClient;

export async function connectDatabase() {
    console.log('Starting database connection');
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
    const db = client.db('community');
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getAllDocuments(collection: string) {
    const db = client.db('community');
    const documents = await db.collection(collection).find().toArray();
    console.log('documents:', documents);
    return documents;
}

export async function getDocumentById(collection: string, id: string) {
    const db = client.db('community');
    const document = await db.collection(collection).findOne({ _id: new ObjectId(id) });
    return document;
}

export async function updateDocumentById(collection: string, id: string, document: object) {
    const db = client.db('community');
    const result = await db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: document });
    return result;
}

export async function deleteDocumentById(collection: string, id: string) {
    const db = client.db('community');
    const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
    return result;
}

connectDatabase();