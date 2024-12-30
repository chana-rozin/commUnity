import http from "./http";
import { community } from "./mongoDB/models";

export const getCommunities = async (userId:string): Promise<any> => {
    if(userId === "") return [];
    const url = `/communities?user_id=${userId}`;
    const response = await http.get(url);
    return response.data;
  };

export const getCommunity = async (communityId: string): Promise<any> => {
    const url = `/communities/${communityId}`;
    const response = await http.get(url);
    return response.data;
}

export const createCommunity = async (community: any): Promise<any> => {
    const url = `/communities`;
    const response = await http.post(url, community);
    return response;
}

export const getCommunitiesByUser = async (user: any): Promise<any> => {
    console.log('type1: ',typeof user.communitiesIds);
    const communitiesIdsStr = user.communitiesIds.join(',');
    console.log("communitiesIdsStr: ",communitiesIdsStr);
    const response = await http.get(`/users/${user._id}/communities?ids=${communitiesIdsStr}`);
    console.log("response.data: ", response.data)
    return response.data;
}

export const addUserToCommunity = async (userId:string, communityId:string): Promise<any> => {
    const url = `communities/${communityId}/users`;
    const response = await http.post(url, userId);
    return response.data;
}
export const deleteUserFromCommunity = async (userId:string, communityId:string): Promise<any> => {
    const url = `communities/${communityId}/users/${userId}`;
    const response = await http.delete(url);
    return response.data;
}

export const updateCommunity = async (communityId: string, data: any): Promise<any> => {
    const url = `/communities/${communityId}`;
    const response = await http.patch(url, data);
    return response.data;
}
