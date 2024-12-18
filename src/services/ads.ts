import http from './http';

export const getAds = async (): Promise<any> => {
  const url = `/ads`; 
  const response = await http.get(url);
  return response;
};


export const saveAd = async (userId: string, adId: string) => {
  try {
    const response = await http.post(`/users/${userId}/ads`, adId );
    return response;
  } catch (error) {
    console.error("Error saving ad:", error);
    throw error;
  }
};

export const unSaveAd = async (userId: string, adId: string) => {
  try {
    const response = await http.delete(`/users/${userId}/ads`, {data: adId});
    return response;
  } catch (error) {
    console.error("Error unSaving ad:", error);
    throw error;
  }
};

export const createAd = async (ad: any): Promise<any>=>{
  const url = `/ads`;    
  const response = await http.post(url, ad);
  return response;
}