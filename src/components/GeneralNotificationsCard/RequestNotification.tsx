import React from 'react';
import { Notifications } from '@/types/general.type';

interface RequestNotificationProps {
    notification: Notifications;
}

const RequestNotification: React.FC<RequestNotificationProps> = ({ notification }) => {
    return (
        <div className="request-notification">
            <p>{notification.message}</p>
            <button className="accept-btn">קבל עזרה</button>
            <button className="reject-btn">דחה</button>
        </div>
    );
};

export default RequestNotification;
