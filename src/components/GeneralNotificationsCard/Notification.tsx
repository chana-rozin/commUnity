
"use client"
import React, { useCallback, memo } from 'react';
import { BiBell, BiTime, BiCalendarExclamation } from 'react-icons/bi';
import { lendItem } from "@/services/loans";
import { deleteNotification } from "@/services/users"
import {
    Notifications,
    UrgencyLevel,
    NotificationType,
    SubjectInNotificationType
} from '@/types/general.type';
import useUserStore from '@/stores/userStore';

interface NotificationWrapperProps {
    urgencyLevel: UrgencyLevel;
    children: React.ReactNode;
}

const NotificationWrapper = memo(({ urgencyLevel, children }: NotificationWrapperProps) => {
    const getUrgencyStyles = () => {
        switch (urgencyLevel) {
            case UrgencyLevel.High:
                return 'border-none bg-red-50';
            case UrgencyLevel.Medium:
                return 'border-none bg-yellow-50';
            case UrgencyLevel.Low:
                return 'border-none bg-violet-50';
            default:
                return 'border-gray-200 bg-white';
        }
    };

    return (
        <div className={`rounded-lg border-2 p-4 ${getUrgencyStyles()} transition-all duration-300`}>
            {children}
        </div>
    );
});

NotificationWrapper.displayName = 'NotificationWrapper';

interface NotificationIconProps {
    type: SubjectInNotificationType;
    className?: string;
}

const NotificationIcon = memo(({ type, className = "h-5 w-5" }: NotificationIconProps) => {
    switch (type) {
        case SubjectInNotificationType.loan:
            return <BiTime className={className} />;
        case SubjectInNotificationType.babysitting:
            return <BiCalendarExclamation className={className} />;
        default:
            return <BiBell className={className} />;
    }
});

NotificationIcon.displayName = 'NotificationIcon';

interface ReminderNotificationProps {
    notification: Notifications;
}

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
            // TODO: Add error handling UI feedback
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
                        className="px-3 py-1 text-xs font-medium rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                        onClick={handleAccept}
                    >
                        תודה, אשתדל לזכור
                    </button>
                </div>
            </div>
        </NotificationWrapper>
    );
});

ReminderNotification.displayName = 'ReminderNotification';

interface RequestNotificationProps {
    notification: Notifications;
}

const RequestNotification = memo(({ notification }: RequestNotificationProps) => {
    const deleteNotificationFromStore = useUserStore((state) => state.deleteNotification);

    const handleAccept = useCallback(async () => {
        try {
            switch (notification.subject.type) {
                case SubjectInNotificationType.loan:
                    debugger
                    await lendItem(notification.subject._id, notification.sender._id);
                    break;
                case SubjectInNotificationType.babysitting:
                    // TODO: Implement accept logic
                    return;
                default:
                    return;
            }

            if (notification._id) {
                deleteNotificationFromStore(notification._id);
                await deleteNotification(notification._id);
            }
        } catch (error) {
            console.error('Failed to accept request:', error);
            // TODO: Add error handling UI feedback
        }
    }, [notification, deleteNotificationFromStore]);

    const handleReject = useCallback(async () => {
        try {
            if (!notification._id) {
                console.error('No notification ID found');
                return;
            }

            deleteNotificationFromStore(notification._id);
            await deleteNotification(notification._id);
        } catch (error) {
            console.error('Failed to delete notification:', error);
            // TODO: Add error handling UI feedback
        }
    }, [notification._id, deleteNotificationFromStore]);

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

export { ReminderNotification, RequestNotification };