import { ObjectId } from "mongodb";
import mongoose, { Document, Model } from 'mongoose';
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
    debugger
    await ensureDBConnection();
    const model = getModel(modelName);

    try {
        const doc = new model(data);
        await doc.validate(); // Validate against schema
        const savedDoc = await doc.save();
        return savedDoc;
    } catch (error: any) {
        throw new Error(`Insert failed: ${error.message}`);
    }
}

export async function getAllDocuments(modelName: string, query: Object = {}, populateFields?: string | string[]): Promise<any[]> {
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
    populateFields?: string | string[]
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
        const res = await queryBuilder.exec();
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

interface TemporaryDocument extends mongoose.Document {
    createdAt: Date;
    [key: string]: any;
}

export async function insertTemporaryDocument(
    collectionName: string,
    document: object,
    expireAfterSeconds: number = 300
): Promise<mongoose.Types.ObjectId> {
    try {
        // Define schema with TTL index
        const schema = new mongoose.Schema<TemporaryDocument>(
            {
                createdAt: { type: Date, default: Date.now, index: { expireAfterSeconds } },
                ...Object.keys(document).reduce((fields, key) => {
                    fields[key] = { type: mongoose.Schema.Types.Mixed };
                    return fields;
                }, {} as Record<string, any>),
            },
            { collection: collectionName }
        );

        // Create or retrieve the model for the collection
        const model = mongoose.models[collectionName] || mongoose.model<TemporaryDocument>(collectionName, schema);

        // Insert the document
        const newDocument = new model(document);
        const savedDocument = await newDocument.save();

        console.log(`Document inserted with ID: ${savedDocument._id}`);
        return savedDocument._id;
    } catch (error) {
        console.error('Error inserting temporary document:', error);
        throw error;
    }
}

export function foreignKey(key: string): any {
    return new ObjectId(key);
}