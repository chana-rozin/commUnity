import { ObjectId } from "mongodb";
import mongoose, { Document, Model, Schema } from 'mongoose';
import { user, ad, babysitting, post, neighborhood, minyan, loan, event, community, VerifyEmail, password } from './models'; // Import the predefined models

const modelMap: { [key: string]: Model<any> } = {
    user,
    ad,
    babysitting,
    post,
    neighborhood,
    minyan,
    loan,
    event,
    community,
    VerifyEmail,
    password,
};

let isConnected = false;

/**
 * Singleton connection function to MongoDB Atlas
 */
async function connectToDB() {
    if (isConnected) {
        console.log('Using existing database connection');
        const connection = mongoose.connection;
        return connection;
    }

    try {
        const dbUri = process.env.DB_CONNECTION;
        if (!dbUri) {
            throw new Error('Database connection string is not defined');
        }
        const connection = await mongoose.connect(dbUri);
        isConnected = connection.connections[0].readyState === 1;
        console.log('Connected to MongoDB Atlas');
        return connection;
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        throw error;
    }
}

function getModel(modelName: string): Model<Document> {
    const model = modelMap[modelName];
    if (!model) {
        throw new Error(`Model "${modelName}" not found`);
    }
    return model;
}
/**
 * Ensure a connection to the database before performing any operation
 */
async function ensureDBConnection(): Promise<void> {
    if (mongoose.connection.readyState !== 1) {
        await connectToDB();
    }
}

export async function insertDocument<T extends Document>(modelName: string, data: Partial<T>): Promise<any> {
    await ensureDBConnection();
    const model = getModel(modelName);

    try {
        const doc = new model(data);
        await doc.validate(); // Validate against schema
        const savedDoc = await doc.save();
        return savedDoc;
    } catch (error: any) {
        console.log(error.message);
        throw new Error(`Insert failed: ${error.message}`);
    }
}

export async function getAllDocuments(modelName: string, query: Object = {}, populateFields?: { path: string, select: string } | { path: string, select: string }[]): Promise<any[]> {
    await ensureDBConnection();
    const model = getModel(modelName);

    try {
        const queryBuilder = model.find(query);
        if (populateFields) {
            queryBuilder.populate(populateFields);
        }
        return await queryBuilder.exec();
    } catch (error: any) {
        throw new Error(`Get failed: ${error.message}`);
    }
}

export async function getDocumentById<T extends Document>(
    modelName: string,
    id: string,
    populateFields?: { path: string, select: string } | { path: string, select: string }[]
): Promise<any | null> {
    await ensureDBConnection();
    const model = getModel(modelName);
    try {
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        const queryBuilder = model.findById(new ObjectId(id));
        if (populateFields) {
            queryBuilder.populate(populateFields);
        }
        const res = await queryBuilder.exec()
        return res;
    } catch (error: any) {
        throw new Error(`Get by ID failed: ${error.message}`);
    }
}

export async function updateDocumentById<T extends Document>(
    modelName: string,
    id: string,
    updateData: Partial<T>
): Promise<any | null> {
    await ensureDBConnection();
    const model = getModel(modelName);

    try {
        const res = await model.findByIdAndUpdate({ _id: new ObjectId(id) }, // Find the document by ID
            { $set: updateData }, // Update only the provided fields
            {
                new: true, // Return the updated document
                runValidators: true, // Validate against schema
            }).exec();
        return res;
    } catch (error: any) {
        throw new Error(`Update failed: ${error.message}`);
    }
}


export async function deleteDocumentById<T extends Document>(
    modelName: string,
    id: string
): Promise<any | null> {
    await ensureDBConnection();
    const model = getModel(modelName);
    try {
        return await model.findByIdAndDelete(id).exec();
    } catch (error: any) {
        throw new Error(`Delete failed: ${error.message}`);
    }
}

export function foreignKey(key: string): any {
    return new ObjectId(key);
}