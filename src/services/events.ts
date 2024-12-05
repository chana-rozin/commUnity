import http from './http';

export const getEvents = async (): Promise<any> => {
  const url = `/event`; 
  const response = await http.get(url);
  return response;
};


export const saveEvent = async (userId: string, postId: string) => {
  try {
    const response = await http.post(`/users/${userId}/posts`, postId );
    return response;
  } catch (error) {
    console.error("Error saving post:", error);
    throw error;
  }
};

export const unSaveEvent = async (userId: string, postId: string) => {
  try {
    const response = await http.delete(`/users/${userId}/posts`, {data: postId});
    return response;
  } catch (error) {
    console.error("Error unSaving post:", error);
    throw error;
  }
};