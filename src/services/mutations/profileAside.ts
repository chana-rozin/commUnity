import { useQuery } from '@tanstack/react-query';
import { getNeighborhood } from '@/services/neighborhoods';
import { getCommunitiesByUser } from '@/services/communities';
import useUserStore from '@/stores/userStore';

export const useCommunities = () => {
    const user = useUserStore((state) => state.user);
    return useQuery({
        queryKey: ['communities', user?._id],
        queryFn: () => getCommunitiesByUser(user),
        enabled: !!user, // Only fetch if the user exists
    });
};

export const useNeighborhood = () => {
    const user = useUserStore((state) => state.user);
    return useQuery({
        queryKey: ['neighborhood', user?.neighborhood._id],
        queryFn: () => getNeighborhood(user!.neighborhood._id),
        enabled: !!user?.neighborhood._id, // Only fetch if the neighborhood id exists
    });
};