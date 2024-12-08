import http from "./http";

export const getUsers = async (): Promise<any> => {
    const url = `/users`;
    const response = await http.get(url);
    return response.data;
}

export const getUserById = async (userId: string): Promise<any> => {
    const url = `/users/${userId}`;
    console.log("Fetching URL:", url);
    const response = await http.get(url);
    console.log("Response:", response);
    return response.data;
}

export const createUser = async (user: any): Promise<any> => {
    const url = `/users`;
    const response = await http.post(url, user);
    return response;
}

export const updateUser = async (userId: string, user: any): Promise<any> => {
    const url = `/users/${userId}`;
    const response = await http.patch(url, user);
    return response;
}