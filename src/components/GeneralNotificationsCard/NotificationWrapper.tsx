"use client"
import React, { memo } from 'react';
import { NotificationWrapperProps } from '@/types/notifications';
import { UrgencyLevel } from '@/types/general.type';

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
export default NotificationWrapper;
