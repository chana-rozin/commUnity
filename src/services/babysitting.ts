import { Babysitting } from "@/types/babysitting.type";
import http from "./http";
import { Notifications } from '@/types/general.type';


export const getBabysitting = async (): Promise<Babysitting[]> => {
    const url = `/babysitting`;
    const response = await http.get(url);
    return response.data;
}

export const getOpenRequestsByCommunities = async (communityIds: string[], onlyOpen=false): Promise<Babysitting[]> => {
    const url = `/babysitting?communities=${communityIds.join(',')}&&open=${onlyOpen}`;
    const response = await http.get(url);
    return response.data;
}

export const getRequestsByUser = async (userId: string, communityIds: string[], onlyOpen=false): Promise<Babysitting[]> => {
    const url = `/babysitting?user_id=${userId}&communities=${communityIds.join(',')}&open=${onlyOpen}`;
    const response = await http.get(url);
    return response.data;
}

export const createBabysitting = async (babysitting: Babysitting): Promise<any> => {
    const url = `/babysitting`;
    const response = await http.post(url, babysitting);
    return response;
}

export const babysit = async (requestId: string, babysitterId: string): Promise<any> => {
    const url = `/babysitting/${requestId}`;
    const response = await http.patch(url, { babysitter: babysitterId });
    return response.data;
};

export const deleteBabysitting = async (requestId: string): Promise<any> => {
    const url = `/babysitting/${requestId}`;
    const response = await http.delete(url);
    return response.data;
}

export const offerBabysit = async (requestId: string, babysitterId: string, babysitterName: string, request: string, requesterId: string): Promise<Notifications> => {
    const url = `/notifications`;

    const notificationData = {
        receiverId: requesterId,
        message: `הצעה: ${babysitterName} מעוניין/ת לשמרטף לך ב-${request}`,
        sender: {_id: babysitterId},
        urgencyLevel: 1,
        type: 3,
        subject: { _id: requestId, type: 2 },
    };

    const response = await http.post(url, notificationData);
    const createdNotification = response.data.notification;

    // Send Pusher message with the created notification
    await http.post('/pusher/send', {
        channel: `user-${requesterId}`,
        event: "babysit-request",
        message: createdNotification
    });
    console.log("notification response id:",createdNotification._id);

    return createdNotification;
};

// export const getOpenLoansByCommunityId = async (communityId: string): Promise<any> => {
//     const url = `/loans?communities=${communityId}&is_open=true`;
//     const response = await http.get(url);
//     return response.data;
// }

// export const getActiveLoansByUserId = async (userId: string): Promise<any> => {
//     const url = `/loans?active=true&user_id=${userId}`;
//     const response = await http.get(url);
//     return response.data;
// }

// export const getLoansHistoryByUserId = async (userId: string): Promise<any> => {
//     const url = `/loans?active=false&user_id=${userId}`;
//     const response = await http.get(url);
//     return response.data;
// }



// export const lendItem = async (loanId: string, lenderId: string): Promise<Loan> => {
//     const url = `/loans/${loanId}`;
//     const response = await http.patch(url, { lenderId });
//     return response.data;
// };

// export const returnLoan = async (loanId: string): Promise<Loan> => {
//     const url = `/loans/${loanId}`;
//     const response = await http.patch(url, { active: false });
//     return response.data;
// };

// //   export const remindLender = async (loanId: string): Promise<void> => {
// //     const url = `/loans/${loanId}/remind`;
// //     await http.patch(url);
// //   };
