import http from './http';

export const getCommunities = async (): Promise<any> => {
    const commUrl = `/communities`;
    const communities = await http.get(commUrl);
    const neiUrl = '/neighborhoods'
    const neighborhood = await http.get(neiUrl);
    const combinationArray = communities.data.push(neighborhood.data[0])
    return combinationArray;
};


export const createCommunity = async (community: any): Promise<any> => {
    const url = `/communities`;
    const response = await http.post(url, community);
    return response;
}