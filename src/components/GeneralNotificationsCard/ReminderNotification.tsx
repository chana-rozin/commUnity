import React from 'react';
import { Notifications } from '@/types/general.type';

interface ReminderNotificationProps {
    notification: Notifications;
}

const ReminderNotification: React.FC<ReminderNotificationProps> = ({ notification }) => {
    return (
        <div className="reminder-notification">
            <p>{notification.message}</p>
        </div>
    );
};

export default ReminderNotification;
