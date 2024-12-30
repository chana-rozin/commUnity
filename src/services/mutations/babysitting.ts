import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBabysittingByCommunitiesId, createBabysitting, babysit, deleteBabysitting } from "@/services/babysitting";
import { Babysitting } from "@/types/babysitting.type";
import { toast } from "react-toastify";
import { User } from "@/types/user.type";
import http from "../http";

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
        mutationFn: async (requestData) => {
            requestData.AuthorizedIds?.forEach(async id=>
            await http.post('/pusher/send', {
                channel: `babysitting_${id}`,
                event: 'new-request',
            }));
            return createBabysitting(requestData as Babysitting);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["babysittingRequests"] });
            toast.success("הבקשה נוספה בהצלחה");
        },
        onError: (error) => {
            console.error("Failed to create a babysitting request:", error);
            toast.error("שגיאה בהוספת בקשה");
        },
    });
};

export const useBabysit = () => {
    const queryClient = useQueryClient();

    return useMutation<Babysitting, Error, { requestId: string; user: User | null }>({
        mutationFn: async ({ requestId, user }) => {
            if (!user || !user._id) {
                throw new Error("User is required to babysit");
            }
            return babysit(requestId, user._id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["babysittingRequests"] });
            toast.success("הבקשה עודכנה בהצלחה");
        },
        onError: (error) => {
            console.error("Failed to update babysitting request:", error);
            toast.error("שגיאה בעדכון הבקשה");
        },
    });
};

export const useDeleteBabysittingRequest = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, {requestId:string,authorizedIds:string[]}>({
        mutationFn: async ({requestId, authorizedIds}) => 
            {
                authorizedIds?.forEach(async id=>
                await http.post('/pusher/send', {
                    channel: `babysitting_${id}`,
                    event: 'delete-request',
                }));
                return deleteBabysitting(requestId)
            },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["babysittingRequests"] });
            toast.success("הבקשה נמחקה בהצלחה");
        },
        onError: (error) => {
            console.error("Failed to delete babysitting request:", error);
            toast.error("שגיאה במחיקת הבקשה");
        },
    });
};