import http from "./http";

export const getPosts = async (): Promise<any>=>{
    const url = `/posts`;    
    const response = await http.get(url);
    return response;
}

export const getPostById = async (postId: string): Promise<any>=>{
    const url = `/posts/${postId}`; 
    const response = await http.get(url);
    return response.data;
}

export const getPostsByCommunityId = async (communityId: string): Promise<any>=>{
  const url = `/posts?communities=${communityId}`;    
  const response = await http.get(url);
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

export const savePost = async (userId: string, postId: string) => {
    try {
      const response = await http.post(`/users/${userId}/posts`, postId );
      return response;
    } catch (error) {
      console.error("Error saving post:", error);
      throw error;
    }
};

export const unSavePost = async (userId: string, postId: string) => {
    try {
      const response = await http.delete(`/users/${userId}/posts`, {data: postId});
      return response;
    } catch (error) {
      console.error("Error unSaving post:", error);
      throw error;
    }
};