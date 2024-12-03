import http from "./http";

export const getNeighborhoods = async (): Promise<any> => {
    const url = `/neighborhood`;
    const response = await http.get(url);
    return response.data;
}

export const getNeighborhood = async (neighborhoodId: string): Promise<any> => {
    const url = `/neighborhood/${neighborhoodId}`;
    const response = await http.get(url);
    return response.data;
}

export const createNeighborhood = async (neighborhood: any): Promise<any> => {
    const url = `/neighborhood`;
    const response = await http.post(url, neighborhood);
    return response;
}