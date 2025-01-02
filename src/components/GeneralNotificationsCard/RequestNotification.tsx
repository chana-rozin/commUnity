"use client"
import React, { memo, useCallback } from 'react';
import { RequestNotificationProps } from '@/types/notifications';
import { SubjectInNotificationType } from '@/types/general.type';
import useUserStore from '@/stores/userStore';
import { useQueryClient } from '@tanstack/react-query';
import { loanQueryKeys } from '@/services/mutations/loans';
import { lendItem } from "@/services/loans";
import { acceptInvitation } from '@/services/communities';
import { deleteNotification } from "@/services/users";
import { useBabysit } from "@/services/mutations/babysitting";
import NotificationWrapper from './NotificationWrapper';
import NotificationIcon from './NotificationIcon';

const RequestNotification = memo(({ notification }: RequestNotificationProps) => {
    const deleteNotificationFromStore = useUserStore((state) => state.deleteNotification);
    const { user, setUser } = useUserStore();
    const queryClient = useQueryClient();
    const babysitMutation = useBabysit();

    const refreshData = useCallback(() => {
        if (user?._id) {
            queryClient.invalidateQueries({
                queryKey: loanQueryKeys.activeByUser(user._id)
            });
        }

        if (user?.neighborhood?._id) {
            queryClient.invalidateQueries({
                queryKey: loanQueryKeys.openLoansByCommunity(user.neighborhood._id)
            });
        }
    }, [queryClient, user]);

    const handleAccept = useCallback(async () => {
        try {
            switch (notification.subject.type) {
                case SubjectInNotificationType.loan: {
                    await lendItem(notification.subject._id, notification.sender._id);
                    break;
                }
                case SubjectInNotificationType.babysitting: {
                    await babysitMutation.mutateAsync({
                        requestId: notification.subject._id,
                        userId: notification.sender._id,
                    });
                    break;
                }
                case SubjectInNotificationType.community: {
                    await acceptInvitation(user?._id ? user._id : "", notification.subject._id, user, setUser);
                    break;
                }
                default:
                    return;
            }

            if (notification._id) {
                deleteNotificationFromStore(notification._id);
                await deleteNotification(notification._id);
            }

            refreshData();
        } catch (error) {
            console.error('Failed to accept request:', error);
        }
    }, [notification, deleteNotificationFromStore, refreshData, babysitMutation, user, setUser]);

    const handleReject = useCallback(async () => {
        try {
            if (!notification._id) {
                console.error('No notification ID found');
                return;
            }

            deleteNotificationFromStore(notification._id);
            await deleteNotification(notification._id);
            refreshData();
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    }, [notification._id, deleteNotificationFromStore, refreshData]);

    const requestInfo = {
        icon: <NotificationIcon type={notification.subject.type} />,
        title: notification.subject.type === SubjectInNotificationType.loan
            ? 'בקשת השאלה'
            : notification.subject.type === SubjectInNotificationType.babysitting
                ? 'בקשת בייביסיטינג'
                : 'בקשה חדשה',
        acceptText: notification.subject.type === SubjectInNotificationType.loan
            ? 'אשר השאלה'
            : notification.subject.type === SubjectInNotificationType.babysitting
                ? 'אשר בייביסיטינג'
                : 'אשר',
        rejectText: 'דחה בקשה'
    };

    return (
        <NotificationWrapper urgencyLevel={notification.urgencyLevel}>
            <div className="flex items-start gap-4">
                <div className="text-indigo-600">{requestInfo.icon}</div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">
                        {requestInfo.title}
                    </h3>
                    <div>
                        <div className="text-sm text-gray-700 mb-3">{notification.message}</div>
                        <div className="flex gap-2 justify-end">
                            <button
                                className="px-3 py-1 text-xs font-medium rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                                onClick={handleReject}
                            >
                                {requestInfo.rejectText}
                            </button>
                            <button
                                className="px-3 py-1 text-xs font-medium rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition"
                                onClick={handleAccept}
                            >
                                {requestInfo.acceptText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </NotificationWrapper>
    );
});

RequestNotification.displayName = 'RequestNotification';
export default RequestNotification;