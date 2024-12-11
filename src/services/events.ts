import http from './http';

export const getEvents = async (): Promise<any> => {
  const url = `/events`; 
  const response = await http.get(url);
  return response;
};


export const saveEvent = async (userId: string, eventId: string) => {
  try {
    const response = await http.post(`/users/${userId}/events`, eventId );
    return response;
  } catch (error) {
    console.error("Error saving event:", error);
    throw error;
  }
};

export const unSaveEvent = async (userId: string, eventId: string) => {
  try {
    const response = await http.delete(`/users/${userId}/events`, {data: eventId});
    return response;
  } catch (error) {
    console.error("Error unSaving event:", error);
    throw error;
  }
};

export const createEvent = async (event: any): Promise<any>=>{
  const url = `/events`;    
  const response = await http.post(url, event);
  return response;
}