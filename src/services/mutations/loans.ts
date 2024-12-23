import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as loansService from '../loans';
import { Loan } from '@/types/loan.type';
import { User } from "@/types/user.type";
import { Notifications } from '@/types/general.type';

// Query Keys
export const loanQueryKeys = {
    all: ['loans'],
    byId: (id: string) => ['loans', id],
    byCommunity: (communityId: string) => ['loans', 'community', communityId],
    openLoansByCommunity: (communityId: string) => ['loans', 'open', communityId],
    activeByUser: (userId: string) => ['loans', 'active', userId],
    historyByUser: (userId: string) => ['loans', 'history', userId],
};

// Fetch Hooks
export const useLoans = () => {
    return useQuery({
        queryKey: loanQueryKeys.all,
        queryFn: loansService.getLoans,
    });
};

export const useLoansByCommunity = (communityId: string) => {
    return useQuery({
        queryKey: loanQueryKeys.byCommunity(communityId),
        queryFn: () => loansService.getAllLoansByCommunityId(communityId),
        enabled: !!communityId,
    });
};


export const useOpenLoansByCommunity = (communityId: string) => {
    return useQuery({
        queryKey: loanQueryKeys.openLoansByCommunity(communityId),
        queryFn: () => loansService.getOpenLoansByCommunityId(communityId),
        enabled: !!communityId,
    });
};

export const useActiveLoansByUser = (userId: string) => {
    return useQuery<Loan[]>({
        queryKey: loanQueryKeys.activeByUser(userId),
        queryFn: () => loansService.getActiveLoansByUserId(userId),
        enabled: !!userId,
    });
};

export const useLoansHistoryByUser = (userId: string) => {
    return useQuery<Loan[]>({
        queryKey: loanQueryKeys.historyByUser(userId),
        queryFn: () => loansService.getLoansHistoryByUserId(userId),
        enabled: !!userId,
    });
};

// Mutation Hooks
export const useCreateLoan = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: loansService.createLoan,
        onSuccess: (newLoan) => {
            // Invalidate and refetch relevant queries
            queryClient.invalidateQueries({ queryKey: loanQueryKeys.all });
            queryClient.invalidateQueries({ queryKey: loanQueryKeys.activeByUser(newLoan.user_id) });
        },
        onError: (error) => {
            console.error('Failed to create loan', error);
            // Optional: Add error handling logic
        }
    });
};

// Mutation to lend an item
export const useLendItem = () => {
    const queryClient = useQueryClient();

    return useMutation<Loan, Error, { loanId: string, user: User | null }>({
        mutationFn: async ({ loanId, user }) => {
            if (!user || !user._id) {
                throw new Error('User is required to lend an item');
            }
            return loansService.lendItem(loanId, user._id);
        },
        onSuccess: (_, { user }) => {
            if (user?.neighborhood._id) {
                queryClient.invalidateQueries({
                    queryKey: loanQueryKeys.openLoansByCommunity(user.neighborhood._id)
                });
            }
        },
        onError: (error) => {
            console.error('Failed to lend item', error);
        }
    });
};

// Mutation to return a borrowed item
export const useReturnLoan = () => {
    const queryClient = useQueryClient();

    return useMutation<Loan, Error, { loanId: string, userId: string }>({
        mutationFn: async ({ loanId }) => {
            // Implement your return loan logic here
            return loansService.returnLoan(loanId);
        },
        onSuccess: (_, { userId }) => {
            // Invalidate and refetch active loans for the user
            queryClient.invalidateQueries({
                queryKey: loanQueryKeys.activeByUser(userId)
            });
        },
        onError: (error) => {
            console.error('Failed to return loan', error);
        }
    });
};

// Mutation to offer help
export const useOfferHelp = () => {
    const queryClient = useQueryClient();

    return useMutation<Notifications, Error, { loanId: string, lenderId: string,lenderName:string, item:string, borrowerId: string }>({
        mutationFn: async ({ loanId, lenderId, lenderName,item, borrowerId}) => {
            return loansService.offerHelp(loanId, lenderId, lenderName,item, borrowerId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: loanQueryKeys.all });
        },
        onError: (error) => {
            console.error('Failed to send offer help notification', error);
        },
    });
};

// Mutation to remind a borrower
export const useRemindBorrower = () => {
    return useMutation<Notifications, Error, { loanId: string, item: string, lenderId: string,lenderName:string, borrowerId: string }>({
        mutationFn: async ({ loanId, item, lenderId,lenderName, borrowerId }) => {
            return loansService.remindBorrower(loanId, item, lenderId,lenderName, borrowerId);
        },
        onError: (error) => {
            console.error('Failed to send reminder notification', error);
        },
    });
};