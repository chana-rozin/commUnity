import http from './http';

export const getEvents = async (): Promise<any> => {
  const url = `/event`; 
  const response = await http.get(url);
  return response;
};
