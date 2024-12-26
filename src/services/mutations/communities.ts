"use client"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCommunities, addUserToCommunity } from '@/services/communities';
import { Community } from '@/types/community.type';
import http from '../http';


export const useCommunities = (userId: string) => {
    return useQuery<Community[]>({
        queryKey: ['communities', userId],
        queryFn: () => getCommunities(userId),
        retry: 1
    });
};

export const useCreateCommunity = () => {
    const queryClient = useQueryClient();

    return useMutation<Community, Error, Partial<Community>>({
        mutationFn: async (communityData) => {
            const response = await http.post('/communities', communityData);
            return response.data;
        },
        onSuccess: (result: any) => {
            queryClient.invalidateQueries({ queryKey: ['communities'] });
        },
        onError: (error) => {
            console.error('Failed to create an community:', error);
        },
    });
};

export const useAddUserToCommunity = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { userId: string; communityId: string }>({
        mutationFn: async ({ userId, communityId }) => addUserToCommunity(userId, communityId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['communities'] });
        },
        onError: (error) => {
            console.error('Failed to create an community:', error);
        },
    }
    );
};


