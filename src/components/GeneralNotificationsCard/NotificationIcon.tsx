"use client"
import React, { memo } from 'react';
import { BiBell, BiTime, BiCalendarExclamation } from 'react-icons/bi';
import { SubjectInNotificationType } from '@/types/general.type';
import { NotificationIconProps } from '@/types/notifications';

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
export default NotificationIcon;