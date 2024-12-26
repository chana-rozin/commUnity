import { getAllDocuments, insertDocument, getDocumentById, updateDocumentById } from '@/services/mongoDB/mongodb'
import { generateToken } from '@/services/tokens'
import { NextResponse } from 'next/server';
import { CommunityImageUrl } from '@/services/defaultData'
export async function communityRegister(body: any) {
    const neighborhoodQuery = {
        city: body.address.city,
        name: body.address.neighborhood,
        country: body.address.country
    }
    let userNeighborhood: any = await getAllDocuments("neighborhood", neighborhoodQuery);
    let userCommunity: any;
    if (userNeighborhood.length > 0) {
        body.neighborhood = userNeighborhood[0]._id;
        const communityQuery = {
            neighborhood: userNeighborhood[0]._id
        }
        if (!userNeighborhood[0].streets.includes(body.address.street)) {
            const updateNeighborhoodQuery: any = {
                streets: { $push: body.address.street }
            }
            const updateNeighborhoodStreets = await updateDocumentById("neighborhood", userNeighborhood[0]._id.toString(), updateNeighborhoodQuery);
            if (!updateNeighborhoodStreets) {
                return {
                    message: "Failed to update neighborhood streets",
                    status: 500
                }
            }
        }
        userCommunity = await getAllDocuments("community", communityQuery);
        body.communities = [{_id:userCommunity[0]._id.toString(), name: userCommunity[0].name}]
    }
    else {
        const newNeighborhood: any = {
            country: body.address.country,
            city: body.address.city,
            name: body.address.neighborhood,
            streets: [body.address.street]
        }
        const addNeighborhoodResult = await insertDocument("neighborhood", newNeighborhood);
        newNeighborhood._id = addNeighborhoodResult._id;
        userNeighborhood = [newNeighborhood];

        if (!addNeighborhoodResult) {
            return { message: "Failed to add user's neighborhood", status: 500 }
        }
        body.neighborhood = addNeighborhoodResult._id;
        const newUserCommunity: any = {
            main: true,
            neighborhood: addNeighborhoodResult._id,
            members: [],
            name: addNeighborhoodResult.name,
            description: addNeighborhoodResult.city,
            imageUrl: CommunityImageUrl
        }
        const addUserCommunityResult = await insertDocument("community", newUserCommunity);
        newUserCommunity._id = addUserCommunityResult._id;
        userCommunity = [newUserCommunity];
        body.communities = [{_id:addUserCommunityResult._id.toString(), name: newUserCommunity.name}];
    }
    const result = await insertDocument("user", body);
    if (!result) {
        return { message: "Failed to create user" , status: 500 }
    }

    //update communities membersId:
    userCommunity[0].members.push(result._id);
    const updateCommunityResult = await updateDocumentById("community", userCommunity[0]._id.toString(), userCommunity[0]);
    if (!updateCommunityResult) {
        return { message: "Failed to update user's community", status: 500 }
    }

    body._id = result._id;
    body.neighborhood = { _id: body.neighborhood.toString(), name: body.address.neighborhood };
    //response with token in httpOnly:
    const response = { body:body ,status: 201 };

    return response;
}
