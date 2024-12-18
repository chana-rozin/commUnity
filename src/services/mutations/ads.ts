import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAds, saveAd, unSaveAd } from '@/services/ads'; 
import { Ad } from '@/types/ad.type';
import { User } from '@/types/user.type';
import http from '../http';

export const useAds = () => {
  return useQuery<Ad[]>({
    queryKey: ['ads'],
    queryFn: async () => {
      const response = await getAds();
      return Array.isArray(response.data) ? response.data : [];
    },
    retry: 1,
  });
};

export const useCreateAd = () => {
  const queryClient = useQueryClient();

  return useMutation<Ad, Error, Partial<Ad>>({
    mutationFn: async (adData) => {
      debugger
      const response = await http.post('/ads', adData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
    },
    onError: (error) => {
      console.error('Failed to create an ad:', error);
    },
  });
};

interface SaveAdContext {
  previousAds?: Ad[];
  previousSavedAds?: string[];
}

