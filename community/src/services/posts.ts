import http from "./http";

export const getPosts = async (): Promise<any>=>{
    const url = `/posts`;    
    const response = await http.get(url);
    return response;
}

export const getPostById = async (postId: string): Promise<any>=>{
    const url = `/posts/${postId}`; 
    console.log("Fetching URL:", url);   
    const response = await http.get(url);
    console.log("Response:",response);
    return response.data;
}

export const createPost = async (post: any): Promise<any>=>{
    const url = `/posts`;    
    const response = await http.post(url, post);
    return response;
}

export const likePost = async (postId: string, creatorId: string) => {
    try {
      const response = await http.post(`/posts/${postId}/likes`, creatorId );
      return response;
    } catch (error) {
      console.error("Error liking post:", error);
      throw error;
    }
};

export const unLikePost = async (postId: string, creatorId: string) => {
    try {
      const response = await http.delete(`/posts/${postId}/likes`, {data: creatorId,} );
      return response;
    } catch (error) {
      console.error("Error liking post:", error);
      throw error;
    }
};

export const savePost = async (postId: string) => {
    try {
        //TODO: add proper logic here
      //const response = await http.post(`/posts/${postId}/like`, creatorId );
      //return response;
    } catch (error) {
      console.error("Error liking post:", error);
      throw error;
    }
};