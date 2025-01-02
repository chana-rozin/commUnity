"use client"
import React, { memo, useCallback } from 'react';
import { ReminderNotificationProps } from '@/types/notifications';
import { SubjectInNotificationType } from '@/types/general.type';
import useUserStore from '@/stores/userStore';
import { deleteNotification } from "@/services/users";
import NotificationWrapper from './NotificationWrapper';
import NotificationIcon from './NotificationIcon';

const ReminderNotification = memo(({ notification }: ReminderNotificationProps) => {
    const deleteNotificationFromStore = useUserStore((state) => state.deleteNotification);

    const getTitle = () => {
        switch (notification.subject.type) {
            case SubjectInNotificationType.loan:
                return 'תזכורת להחזרת פריט';
            case SubjectInNotificationType.babysitting:
                return 'תזכורת לבייביסיטינג';
            default:
                return 'תזכורת';
        }
    };

    const handleAccept = useCallback(async () => {
        try {
            if (!notification._id) {
                console.error('No notification ID found');
                return;
            }

            deleteNotificationFromStore(notification._id);
            await deleteNotification(notification._id);
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    }, [notification._id, deleteNotificationFromStore]);

    return (
        <NotificationWrapper urgencyLevel={notification.urgencyLevel}>
            <div className="flex flex-col items-start gap-4">
                <div className="text-indigo-600">
                    <NotificationIcon type={notification.subject.type} />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">
                        {getTitle()}
                    </h3>
                    <div className="text-sm text-gray-700">
                        {notification.message}
                    </div>
                </div>
                <div className="flex gap-2 justify-end">
                    <button
                        className="p-3 text-xs font-medium rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                        onClick={handleAccept}
                    >
                        תודה!, אשתדל לזכור:)
                    </button>
                </div>
            </div>
        </NotificationWrapper>
    );
});

ReminderNotification.displayName = 'ReminderNotification';
export default ReminderNotification;