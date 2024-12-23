import React from 'react';
import { BiBell, BiTime, BiCalendarExclamation } from 'react-icons/bi';
import { lendItem } from "@/services/loans";
import {deleteNotification} from "@/services/users"
import {
    Notifications, UrgencyLevel, NotificationType,
    SubjectInNotificationType
} from '@/types/general.type';
import { user } from '@/services/mongoDB/models';

interface NotificationWrapperProps {
    urgencyLevel: UrgencyLevel;
    children: React.ReactNode;
}

const NotificationWrapper: React.FC<NotificationWrapperProps> = ({ urgencyLevel, children }) => {
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
};

interface ReminderNotificationProps {
    notification: Notifications;
}

const ReminderNotification: React.FC<ReminderNotificationProps> = ({ notification }) => {
    const getIcon = () => {
        switch (notification.subject.type) {
            case SubjectInNotificationType.loan:
                return <BiTime className="h-5 w-5" />;
            case SubjectInNotificationType.babysitting:
                return <BiCalendarExclamation className="h-5 w-5" />;
            default:
                return <BiBell className="h-5 w-5" />;
        }
    };

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

    return (
        <NotificationWrapper urgencyLevel={notification.urgencyLevel}>
            <div className="flex items-start gap-4">
                <div className="text-indigo-600">{getIcon()}</div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">
                        {getTitle()}
                    </h3>
                    <div className="text-sm text-gray-700">
                        {notification.message}
                    </div>
                </div>
            </div>
        </NotificationWrapper>
    );
};

interface RequestNotificationProps {
    notification: Notifications;
}

const RequestNotification: React.FC<RequestNotificationProps> = ({ notification }) => {
    const handleAccept = () => {
        switch (notification.subject.type) {
            case SubjectInNotificationType.loan:
                lendItem(notification.subject._id, notification.sender._id);
                //TODO: delete notification
                break;
            case SubjectInNotificationType.babysitting:
                return; //TODO: Implement accept logic
            default:
                return;
        }
    };

    const handleReject = () => {
        deleteNotification(notification._id);
    };

    const getRequestTypeInfo = () => {
        switch (notification.subject.type) {
            case SubjectInNotificationType.loan:
                return {
                    icon: <BiTime className="h-5 w-5" />,
                    title: 'בקשת השאלה',
                    acceptText: 'אשר השאלה',
                    rejectText: 'דחה בקשה'
                };
            case SubjectInNotificationType.babysitting:
                return {
                    icon: <BiCalendarExclamation className="h-5 w-5" />,
                    title: 'בקשת בייביסיטינג',
                    acceptText: 'אשר בייביסיטינג',
                    rejectText: 'דחה בקשה'
                };
            default:
                return {
                    icon: <BiBell className="h-5 w-5" />,
                    title: 'בקשה חדשה',
                    acceptText: 'אשר',
                    rejectText: 'דחה'
                };
        }
    };

    const requestInfo = getRequestTypeInfo();

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
};

export { ReminderNotification, RequestNotification };