import http from "./http";

export const getPosts = async (): Promise<any>=>{
    const url = `/posts`;    
    const response = await http.get(url);
    return response;
}

export const getPost = async (postId: string): Promise<any>=>{
    const url = `/posts/${postId}`;    
    const response = await http.get(url);
    return response;
}

export const createPost = async (post: any): Promise<any>=>{
    const url = `/posts`;    
    const response = await http.post(url, post);
    return response;
}