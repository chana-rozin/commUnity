import { MongoClient, ObjectId, Filter  } from "mongodb";
import mongoose from "mongoose";

let client: MongoClient;

export async function connectDatabase() {
    console.log("Starting database connection");
    if (!client) {
        const dbConnectionString = process.env.DB_CONNECTION;
        if (!dbConnectionString) {
            throw new Error("Database connection string is not defined");
        }
        client = new MongoClient(dbConnectionString);

        // Connect MongoClient
        await client.connect();
        console.log("Database connected with MongoClient");

        // Connect Mongoose
        if (!mongoose.connection.readyState) {
            await mongoose.connect(dbConnectionString);
            console.log("Database connected with Mongoose");
        }
    }
}

export async function insertDocument(collection: string, document: object) {
    const db = client.db('community');
    const result = await db.collection(collection).insertOne(document);
    console.log(result);
    
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

export async function patchDocumentById(collection: string, id: string, updateData: object) {
    const db = client.db('community');

    // Update the document with the provided data
    const result = await db.collection(collection).findOneAndUpdate(
        { _id: new ObjectId(id) }, // Find the document by ID
        { $set: updateData }, // Update only the provided fields
        { returnDocument: 'after' } // Return the updated document
    );

    return result;
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

export async function insertTemporaryDocument(collection: string, document: object, expireAfterSeconds: number = 300) {
    try {
        const db = client.db('community');
        
        // Ensure TTL index is created
        await db.collection(collection).createIndex(
            { createdAt: 1 },
            { expireAfterSeconds: expireAfterSeconds }
        );

        // Insert document with createdAt field
        const result = await db.collection(collection).insertOne({
            ...document,
            createdAt: new Date(),
        });

        console.log(`Document inserted with ID: ${result.insertedId}`);
        return result;
    } catch (error) {
        console.error('Error inserting temporary document:', error);
        throw error;
    }
}

export async function getDocumentByQuery(collection: string, query: object){
    const db = client.db('community');
    const documents = await db.collection(collection).find(query).toArray();
    return documents;
}
connectDatabase();