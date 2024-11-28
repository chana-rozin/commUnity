import http from "./http";

export const getPosts = async (): Promise<any>=>{
    const url = `/posts`;    
    const response = await http.get(url);
    return response;
}