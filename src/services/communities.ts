import http from "./http";
import { community } from "./mongoDB/models";
import { Notifications } from "@/types/general.type";
import { User } from '@/types/user.type'
import { invalidData } from "@/services/mutations/communities";


export const getCommunities = async (userId: string): Promise<any> => {
    if (userId === "") return [];
    const url = `/communities?user_id=${userId}`;
    const response = await http.get(url);
    return response.data;
}

export const getCommunity = async (communityId: string): Promise<any> => {
    const url = `/communities/${communityId}`;
    const response = await http.get(url);
    return response.data;
}

export const createCommunity = async (community: any): Promise<any> => {
    const url = `/communities`;
    const response = await http.post(url, community);
    return response;
}

export const getCommunitiesByUser = async (user: any): Promise<any> => {
    console.log('type1: ', typeof user.communitiesIds);
    const communitiesIdsStr = user.communitiesIds.join(',');
    console.log("communitiesIdsStr: ", communitiesIdsStr);
    const response = await http.get(`/users/${user._id}/communities?ids=${communitiesIdsStr}`);
    console.log("response.data: ", response.data)
    return response.data;
}

export const addUserToCommunity = async (userId: string, communityId: string): Promise<any> => {
    const url = `communities/${communityId}/users`;
    const response = await http.post(url, userId);
    return response.data;
}

export const deleteUserFromCommunity = async (userId: string, communityId: string): Promise<any> => {
    const url = `communities/${communityId}/users/${userId}`;
    const response = await http.delete(url);
    return response.data;
}

export const updateCommunity = async (communityId: string, data: any): Promise<any> => {
    const url = `/communities/${communityId}`;
    const response = await http.patch(url, data);
    return response.data;
}

export const sendInvitation = async (communityId: string, communityName: string, senderId: string, receiverId: string): Promise<Notifications> => {
    const url = `/notifications`;
    const notificationData = {
        receiverId: receiverId,
        message: `הנך מוזמן להצטרף לקהילה ${communityName}! `,
        sender: { _id: senderId },
        urgencyLevel: 1,
        type: 3,
        subject: { _id: communityId, type: 4 },
    };
    const response = await http.post(url, notificationData);
    const createdNotification = response.data.notification;

    await http.post('/pusher/send', {
        channel: `user-${receiverId}`,
        event: "loan-reminder",
        message: createdNotification
    });
    console.log("notification response id:", createdNotification._id);

    return response.data;
};


export const acceptInvitation = async (receiverId: string, communityId: string, user: User | null, setUser: (user: User, shouldPersist?: boolean) => void) => {
    try{
        const response = await addUserToCommunity(receiverId, communityId);
        const community = await getCommunity(communityId);
        const updatedUser: any = { ...user };
        updatedUser?.communities?.push({
            _id: community._id,
            name: community.name,
        });
        setUser(updatedUser);
        invalidData();
        return community;
    }
    catch(err:any){
        if(err.status === 400){
            return;
        }
    }
}

export const getUserCommunities = async (userId: string): Promise<any> => {
    const response = await http.get(`/users/${userId}/communities`);
    return response.data;
  };