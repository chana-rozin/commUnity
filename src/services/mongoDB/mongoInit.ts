import mongoose, { Model } from 'mongoose';

// Import your models
import { user } from './models';
import { ad } from './models';
import { babysitting } from './models';
import { community } from './models';
import { event } from './models';
import { loan } from './models';
import { minyan } from './models';
import { neighborhood } from './models';
import { post } from './models';
import { VerifyEmail } from './models';
import { password } from './models';

interface ModelDefinition {
    name: string;
    model: Model<any>;
}

const models: ModelDefinition[] = [
    { name: 'users', model: user },
    { name: 'ads', model: ad },
    { name: 'babysittings', model: babysitting },
    { name: 'communities', model: community },
    { name: 'events', model: event },
    { name: 'loans', model: loan },
    { name: 'minyans', model: minyan },
    { name: 'neighborhoods', model: neighborhood },
    { name: 'posts', model: post },
    { name:"verify_email", model: VerifyEmail },
    { name:"passwords", model: password }
];


const ensureCollections = async (): Promise<void> => {
    // Get the correct database object for 'commUnity' from the connection
    const db = mongoose.connection.useDb('community'); // Use the correct DB ('commUnity')

    if (!db) {
        throw new Error('Database connection is not initialized.');
    }
    const collections = await db.listCollections() // Get all collections in the commUnity DB
    // Loop through each model and ensure the collection exists in the 'commUnity' database
    for (const { name, model } of models) {
        // List all collections in the 'commUnity' database

        // Check if the collection already exists
        const collectionExists = collections.some(col => col.name === name);

        if (!collectionExists) {
            console.log(`Creating ${name} collection in 'community' database...`);
            const scopedModel = model.db.useDb('community').model(model.modelName, model.schema);

            // Create the collection in the correct database
            await scopedModel.createCollection(); 
        } else {
            console.log(`${name} collection already exists in 'commUnity' database.`);
        }
    }

    console.log('Database initialization complete.');
};

// Connect to MongoDB Atlas
const connectToDB = async ()=>{ 
const DB_CONNECTION = process.env.DB_CONNECTION;

if (!DB_CONNECTION) {
    throw new Error('Please define the MONGODB_ATLAS_CONNECTION_STRING environment variable inside .env.local');
}


mongoose.connect(DB_CONNECTION)
    .then(() => {
        console.log('Connected to MongoDB.');
        return ensureCollections();
    })
    .catch((err) => console.error('Database connection error:', err));
}

export default connectToDB;

