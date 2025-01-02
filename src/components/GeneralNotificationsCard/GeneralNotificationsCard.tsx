"use client"
import React, { useEffect, useMemo } from "react";
import  ReminderNotification  from "./ReminderNotification";
import  RequestNotification  from "./RequestNotification";
import { Notifications, NotificationType } from "@/types/general.type";
import useUserStore from "@/stores/userStore";
import pusherClient from "@/services/pusher";
import { NoLoansSection } from "../Loans/NoLoansSection";

const GeneralNotificationsCard: React.FC = () => {
    const user = useUserStore((state) => state.user);
    const addNotification = useUserStore((state) => state.addNotification);
    const notifications = user?.notifications ?? [];  

    useEffect(() => {
        if (!user?._id) return;

        const channel = pusherClient.subscribe(`user-${user._id}`);

        const handleNotification = (data: { message: Notifications }) => {
            console.log("data.message: ",JSON.stringify(data.message));
            if (data.message) {
                addNotification(data.message);
            }
        };

        const eventTypes = [
            'loan-request',
            'loan-reminder',
            'babysit-request',
            'babysit-reminder',
            'community-invite',
        ];

        eventTypes.forEach(eventType => {
            channel.bind(eventType, handleNotification);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [user?._id, addNotification]);

    // Memoize sorted notifications to prevent unnecessary re-renders
    const sortedNotifications = useMemo(() => {
        return [...notifications].sort((a: Notifications, b: Notifications) => {
            if (b.urgencyLevel !== a.urgencyLevel) {
                return b.urgencyLevel - a.urgencyLevel;
            }
            return b.type - a.type;
        });
    }, [notifications]);

    const renderNotification = (notification: Notifications) => {
        const key = notification._id ?? `notification-${notification.type}-${Date.now()}`;
        
        switch (notification.type) {
            case NotificationType.Request:
                return (<RequestNotification key={key} notification={notification}/>);
            case NotificationType.Reminder:
                return (<ReminderNotification key={key} notification={notification}/>);
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col w-full bg-white rounded-xl">
            <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900">הודעות כלליות</h2>
            </div>

            <div className="space-y-3">
                {sortedNotifications.map(renderNotification)}
            </div>

            {!sortedNotifications.length && (
                <NoLoansSection title="אין תזכורות" description="הכל נקי כרגע!"/>
            )}
        </div>
    );
};

export default GeneralNotificationsCard;