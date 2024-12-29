import http from "./http";

export const getCommunities = async (userId: string): Promise<any> => {
    const response = await http.get(`/users/${userId}/communities`);
    return response.data;
  };

export const getCommunity = async (communityId: string): Promise<any> => {
    const url = `/community/${communityId}`;
    const response = await http.get(url);
    return response.data;
}

export const createCommunity = async (community: any): Promise<any> => {
    const url = `/community`;
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