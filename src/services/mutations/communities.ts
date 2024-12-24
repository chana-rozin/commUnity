import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCommunities } from '@/services/communities';
import { Community  } from '@/types/community.type';
import { Neighborhood  } from '@/types/neighborhood.types';
import http from '../http';

export const useCommunities = () => {
    return useQuery<(Community|Neighborhood)[]>({
        queryKey: ['communities'],
        queryFn: async () => {
            const response = await getCommunities();
            return Array.isArray(response.data) ? response.data : [];
        },
        retry: 1,
    });
};

export const useCreateCommunity = () => {
    const queryClient = useQueryClient();

    return useMutation<Community, Error, Partial<Community>>({
        mutationFn: async (communityData) => {
            const response = await http.post('/communities', communityData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['communities'] });
        },
        onError: (error) => {
            console.error('Failed to create an community:', error);
        },
    });
};


