import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBabysitting, getAuthorizedBabysittingRequestsByCommunitiesId, createBabysitting } from "@/services/babysitting";
import { Babysitting } from "@/types/babysitting.type";

export const useBabysittingRequests = (authorizedIds: string[]) => {
    return useQuery<Babysitting[]>({
        queryKey: ["babysittingRequests", authorizedIds],
        queryFn: async () => {
            return getAuthorizedBabysittingRequestsByCommunitiesId(authorizedIds);
        },
        retry: 1,
    });
};

export const useCreateBabysittingRequest = () => {
    const queryClient = useQueryClient();

    return useMutation<Babysitting, Error, Partial<Babysitting>>({
        mutationFn: async (requestData) => createBabysitting(requestData as Babysitting),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["babysittingRequests"] });
        },
        onError: (error) => {
            console.error("Failed to create a babysitting request:", error);
        },
    });
};