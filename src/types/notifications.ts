import { UrgencyLevel, Notifications, SubjectInNotificationType } from '@/types/general.type';

export interface NotificationWrapperProps {
    urgencyLevel: UrgencyLevel;
    children: React.ReactNode;
}

export interface NotificationIconProps {
    type: SubjectInNotificationType;
    className?: string;
}

export interface ReminderNotificationProps {
    notification: Notifications;
}

export interface RequestNotificationProps {
    notification: Notifications;
}