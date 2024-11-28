import mongoose, { Model } from 'mongoose';

// Import your models
import { User } from './models';
import { Ad } from './models';
import { Babysitting } from './models';
import { Community } from './models';
import { Event } from './models';
import { Loan } from './models';
import { Minyan } from './models';
import { Neighborhood } from './models';
import { Post } from './models';
import { log } from 'console';

interface ModelDefinition {
    name: string;
    model: Model<any>;
}

const models: ModelDefinition[] = [
    { name: 'users', model: User },
    { name: 'ads', model: Ad },
    { name: 'babysittings', model: Babysitting },
    { name: 'communities', model: Community },
    { name: 'events', model: Event },
    { name: 'loans', model: Loan },
    { name: 'minyans', model: Minyan },
    { name: 'neighborhoods', model: Neighborhood },
    { name: 'posts', model: Post },
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