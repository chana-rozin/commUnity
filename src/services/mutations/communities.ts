import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCommunities, addUserToCommunity } from '@/services/communities';
import { Community } from '@/types/community.type';
import http from '../http';

// Function to get user communities
const getUserCommunities = async (userId: string): Promise<Community[]> => {
  const response = await http.get(`/users/${userId}/communities`);
  return response.data;
};

// Hook to fetch user communities
export const useUserCommunities = (userId: string | undefined) => {
  return useQuery<Community[]>({
    queryKey: ['userCommunities', userId],
    queryFn: () => getUserCommunities(userId as string),
    enabled: !!userId, // Only run query if userId exists
    retry: 1, // Only retry once if the query fails
  });
};



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



