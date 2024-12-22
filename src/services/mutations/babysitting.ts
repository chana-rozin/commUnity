import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBabysitting, getBabysittingByCommunitiesId, createBabysitting, babysit } from "@/services/babysitting";
import { Babysitting } from "@/types/babysitting.type";
import { toast } from "react-toastify";
import { User } from "@/types/user.type";

export const useBabysittingRequests = (authorizedIds: string[]) => {
    return useQuery<Babysitting[]>({
        queryKey: ["babysittingRequests", authorizedIds],
        queryFn: async () => {
            return getBabysittingByCommunitiesId(authorizedIds);
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
            toast.success("הבקשה נוספה בהצלחה")
        },
        onError: (error) => {
            console.error("Failed to create a babysitting request:", error);
            toast.error("שגיאה בהוספת בקשה")
        },
    });
};

export const useBabysit = () => {
    const queryClient = useQueryClient();

    return useMutation<Babysitting, Error, { requestId: string, user: User | null }>({
        mutationFn: async ({ requestId, user }) => {
            if (!user || !user._id) {
                throw new Error('User is required to babysit');
            }
            return babysit(requestId, user._id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["babysittingRequests"] });
            toast.success("הבקשה עודכנה בהצלחה")
        },
        onError: (error) => {
            console.error("Failed to create a babysitting request:", error);
            toast.error("שגיאה בעדכון הבקשה")
        },
    });
};