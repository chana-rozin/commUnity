import http from "./http";
import { Loan } from "../types/loan.type";
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

export const remindBorrower = async (loanId: string, item: string, lenderId: string, borrowerId: string) => {
    try {
        // TODO: Send notification to borrower
        //   await sendNotification({
        //     userId: borrowerId,
        //     message: `תזכורת: הפריט ${item} טרם הוחזר למלווה`,
        //     type: 'reminder',
        //     metadata: {
        //       loanId,
        //       lenderId,
        //       item
        //     }
        //   });

        await http.post('/pusher/send', {
            channel: `user-${borrowerId}`,
            event: "loan-reminder",
            message: `⚠️ תזכורת: הפריט ${item} טרם הוחזר למלווה`,
        });
    } catch (error) {
        console.error('Failed to send reminder', error);
        throw error;
    }
};