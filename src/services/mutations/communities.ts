"use client"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCommunities, addUserToCommunity, deleteUserFromCommunity, updateCommunity, sendInvitation } from '@/services/communities';
import { Community } from '@/types/community.type';
import { Notifications } from '@/types/general.type';
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

export const useDeleteUserFromCommunity = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { userId: string; communityId: string }>({
        mutationFn: async ({ userId, communityId }) => deleteUserFromCommunity(userId, communityId),
        onSuccess: () => {
            debugger
            queryClient.invalidateQueries({ queryKey: ['communities'] });
        },
        onError: (error) => {
            console.error('Failed to create an community:', error);
        },
    }
    );
};

export const useUpdateCommunity= ()=>{
    const queryClient = useQueryClient();

    return useMutation<void, Error, { data: any; communityId: string }>({
        mutationFn: async ({ data, communityId }) => updateCommunity(communityId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['communities'] });
        },
        onError: (error) => {
            console.error('Failed to create an community:', error);
        },
    }
    );
}

export const useSendInvitation = () => {
    return useMutation<Notifications, Error, { communityId: string, communityName: string, senderId: string,receiverId: string }>({
        mutationFn: async ({ communityId, communityName, senderId, receiverId }) => {
            return sendInvitation(communityId,communityName,senderId, receiverId);
        },
        onError: (error) => {
            console.error('Failed to send reminder notification', error);
        },
    });
};


