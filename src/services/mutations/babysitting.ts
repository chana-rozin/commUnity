import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOpenRequestsByCommunities, createBabysitting, babysit, deleteBabysitting, offerBabysit, getRequestsByUser } from "@/services/babysitting";
import { Babysitting } from "@/types/babysitting.type";
import { toast } from "react-toastify";
import { User } from "@/types/user.type";
import http from "../http";
import { Notifications } from '@/types/general.type';

export const useBabysittingRequests = (authorizedIds: string[]) => {
    return useQuery<Babysitting[]>({
        queryKey: ["babysittingRequests", authorizedIds],
        queryFn: async () => {
            return getOpenRequestsByCommunities(authorizedIds, true);
        },
        retry: 1,
    });
};


export const useRequestsByUser = (authorizedIds: string[], userId: string) => {
    return useQuery<Babysitting[]>({
        queryKey: ["babysittingRequestsByUser", authorizedIds, userId], // Include userId in the query key
        queryFn: async () => {
            return getRequestsByUser(userId, authorizedIds, true); // Add userId to the API call
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

    return useMutation<Babysitting, Error, { requestId: string; userId: string }>({
        mutationFn: async ({ requestId, userId }) => {
            return babysit(requestId, userId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["babysittingRequests"] });
            toast.success("הבקשה עודכנה בהצלחה");
            console.log("request updated");
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

export const useOfferBabysit = () => {

    return useMutation<Notifications, Error, { requestId: string, babysitterId: string, babysitterName: string, requestData: string, requesterId: string }>({
        mutationFn: async ({ requestId, babysitterId, babysitterName, requestData, requesterId }) => {
            return offerBabysit(requestId, babysitterId, babysitterName, requestData, requesterId);
        },
        onSuccess: () => {
            toast.success('ההצעה נשלחה בהצלחה');
        },
        onError: (error) => {
            console.error('Failed to send offer babysitting notification', error);
        },
    });
};
