import http from "./http";
import { Loan } from "../types/loan.type";
import { Notifications } from "@/types/general.type";
//loans?communities=bla&search=bla&active=false&is_open=true&user_id=bla

export const getLoans = async (): Promise<any> => {
    const url = `/loans`;
    const response = await http.get(url);
    return response;
}

export const getAllLoansByCommunityId = async (communityId: string): Promise<any> => {
    const url = `/loans?communities=${communityId}`;
    const response = await http.get(url);
    return response.data;
}

export const getOpenLoansByCommunityId = async (communityId: string): Promise<any> => {
    const url = `/loans?communities=${communityId}&is_open=true`;
    const response = await http.get(url);
    return response.data;
}

export const getActiveLoansByUserId = async (userId: string): Promise<any> => {
    const url = `/loans?active=true&user_id=${userId}`;
    const response = await http.get(url);
    return response.data;
}

export const getLoansHistoryByUserId = async (userId: string): Promise<any> => {
    const url = `/loans?active=false&user_id=${userId}`;
    const response = await http.get(url);
    return response.data;
}

export const createLoan = async (loan: any): Promise<any> => {
    const url = `/loans`;
    const response = await http.post(url, loan);
    return response;
}

export const offerHelp = async (loanId: string, lenderId: string, lenderName:string, item:string, borrowerId: string): Promise<Notifications> => {
    const url = `/notifications`;
    const [firstName, lastName] = lenderName.split(" ");

    const notificationData = {
        receiverId: borrowerId,
        message: `הצעה: ${lenderName} מעוניין להלוות לך  ${item}`,
        sender: {_id: lenderId},
        urgencyLevel: 1,
        type: 3,
        subject: { _id: loanId, type: 2 },
    };

    const response = await http.post(url, notificationData);
    const createdNotification = response.data.notification;

    // Send Pusher message with the created notification
    await http.post('/pusher/send', {
        channel: `user-${borrowerId}`,
        event: "loan-request",
        message: createdNotification
    });

    return createdNotification;
};

export const lendItem = async (loanId: string, lenderId: string): Promise<Loan> => {
    const url = `/loans/${loanId}`;
    const response = await http.patch(url, { lender:{_id:lenderId} , LoanDate: new Date() });
    return response.data;
};

export const returnLoan = async (loanId: string): Promise<Loan> => {
    const url = `/loans/${loanId}`;
    const response = await http.patch(url, { active: false });
    return response.data;
};

export const remindBorrower = async (loanId: string, item: string, lenderId: string, lenderName:string, borrowerId: string): Promise<Notifications> => {
    const url = `/notifications`;
    const [firstName, lastName] = lenderName.split(" ");
    const notificationData = {
        receiverId: borrowerId,
        message: `⚠️ תזכורת: הפריט ${item} טרם הוחזר ל${lenderName}`,
        sender: {_id: lenderId,  
            first_name: firstName,
            last_name: lastName},
        urgencyLevel: 2,
        type: 1,
        subject: { _id: loanId, type: 2 },
    };
    const response = await http.post(url, notificationData);
    const createdNotification = response.data.notification;

    await http.post('/pusher/send', {
        channel: `user-${borrowerId}`,
        event: "loan-reminder",
        message: createdNotification
    });
    console.log("notification response id:",createdNotification._id);

    return response.data;
};