import { Babysitting } from "@/types/babysitting.type";
import http from "./http";

export const getBabysitting = async (): Promise<Babysitting[]> => {
    const url = `/babysitting`;
    const response = await http.get(url);
    return response.data;
}

export const getAuthorizedBabysittingRequestsByCommunitiesId = async (communityIds: string[]): Promise<Babysitting[]> => {
    const url = `/babysitting?communities=${communityIds.join(',')}`;
    const response = await http.get(url);
    return response.data;
}

export const createBabysitting = async (babysitting: Babysitting): Promise<any> => {
    const url = `/babysitting`;
    const response = await http.post(url, babysitting);
    return response;
}

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
