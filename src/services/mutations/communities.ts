// src/services/mutations/communities.ts

import { useQuery } from '@tanstack/react-query';
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

// You can add more community-related mutations here in the future