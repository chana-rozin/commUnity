import http from "./http";

export const getCommunities = async (): Promise<any> => {
    const url = `/community`;
    const response = await http.get(url);
    return response.data;
}

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