import mongoose from "mongoose";

const { Schema } = mongoose;

const adSchema = new mongoose.Schema({
    creatorId: { 
        type: String, 
        // type: Schema.Types.ObjectId, 
        // ref: "users", 
        required: [true, 'creatorId is required'],  // Built-in required validation
        // refPath: "_id" 
    },
    name: { 
        type: String, 
        required: [true, 'name is required']  // Built-in required validation for name
    },
    description: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    expirationDate: { type: Date, required: true },
    AuthorizedIds: [
        {
            type: Schema.Types.ObjectId,
            refPath: "authorizedType",
        },
    ],
    authorizedType: {
        type: String,
        enum: ["communities", "neighborhoods"],
        required: true,
    },
});


// Custom validation for creatorId
adSchema.path('creatorId').validate(async function(value) {
    console.log("Validating creatorId:", value);  // Ensure this is logged
    if (!value) {
        console.log("creatorId is missing");
        return false;  // Ensure this condition is met
    }
    const userExists = await mongoose.model("users").exists({ _id: value });
    return userExists;
}, 'Invalid creatorId: User does not exist');


// Custom validation for AuthorizedIds
adSchema.path('AuthorizedIds').validate(async function (value) {
    if (value && value.length > 0) {
        const Model = mongoose.model(this.authorizedType);
        const validationPromises = value.map((id: mongoose.Types.ObjectId) => Model.exists({ _id: id }));
        const results = await Promise.all(validationPromises);

        if (results.some((exists) => !exists)) {
            return false;
        }
    }
    return true;
}, 'Invalid AuthorizedIds: One or more IDs do not exist in the referenced collection.');

const Ad = mongoose.models.Ad || mongoose.model("Ad", adSchema);
export default Ad;


// Middleware for update operations (updateOne and findOneAndUpdate)
// adSchema.pre(["updateOne", "findOneAndUpdate"], async function (next) {
//     const update = this.getUpdate();
//     const query = this.getQuery();

//     try {
//         // Validate creatorId if present in the update
//         if (update.creatorId) {
//             await validateCreatorId(update.creatorId);
//         }

//         // Validate AuthorizedIds if present in the update
//         if (update.AuthorizedIds) {
//             const ad = await this.model.findOne(query); // Get the current document
//             const authorizedType = update.authorizedType || ad.authorizedType; // Use existing authorizedType if not being updated
//             await validateAuthorizedIds(update.AuthorizedIds, authorizedType);
//         }

//         // Handle $push for AuthorizedIds specifically
//         if (update.$push && update.$push.AuthorizedIds) {
//             const ad = await this.model.findOne(query);
//             const authorizedType = ad.authorizedType;
//             const idsToValidate = Array.isArray(update.$push.AuthorizedIds)
//                 ? update.$push.AuthorizedIds
//                 : [update.$push.AuthorizedIds];

//             await validateAuthorizedIds(idsToValidate, authorizedType);
//         }

//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// Middleware for save operations
// adSchema.pre("save", async function (next) {
//     try {
//         await validateCreatorId(this.creatorId);
//         await validateAuthorizedIds(this.AuthorizedIds, this.authorizedType);
//         next();
//     } catch (error) {
//         next(error as Error);
//     }
// });

// Helper function to validate creatorId
// const validateCreatorId = async (creatorId: mongoose.Types.ObjectId) => {
//     const userExists = await mongoose.model("users").exists({ _id: creatorId });
//     return userExists;
// };

// Helper function to validate AuthorizedIds
// const validateAuthorizedIds = async (authorizedIds: mongoose.Types.ObjectId[], authorizedType: string) => {
//     if (authorizedIds && authorizedIds.length > 0) {
//         const Model = mongoose.model(authorizedType);
//         const validationPromises = authorizedIds.map((id) => Model.exists({ _id: id }));
//         const results = await Promise.all(validationPromises);

//         if (results.some((exists) => !exists)) {
//             throw new Error("One or more AuthorizedIds are invalid references.");
//         }
//     }
// };