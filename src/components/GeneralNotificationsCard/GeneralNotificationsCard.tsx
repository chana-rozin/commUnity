import React, { useEffect } from "react";
import { ReminderNotification, RequestNotification } from "./Notification";
import { Notifications, NotificationType } from "@/types/general.type";
import useUserStore from "@/stores/userStore";
import { pusherClient } from '@/services/pusher';
import { NoLoansSection } from "../Loans/NoLoansSection";

const GeneralNotificationsCard: React.FC = () => {
    const user = useUserStore((state) => state.user);
    const addNotification = useUserStore((state) => state.addNotification);
    const notifications = user?.notifications || [];

    useEffect(() => {
        if (!user?._id) return;

        const channel = pusherClient.subscribe(`user-${user._id}`);

        const handleNotification = (data: { message: Notifications }) => {
            if (data.message) {
                addNotification(data.message);
            }
        };

        channel.bind("loan-request", handleNotification);
        channel.bind("loan-reminder", handleNotification);
        channel.bind("babysit-request", handleNotification);
        channel.bind("babysit-reminder", handleNotification);

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [user?._id, addNotification]);

    const sortedNotifications = [...notifications].sort((a: Notifications, b: Notifications) => {
        if (b.urgencyLevel !== a.urgencyLevel) {
            return b.urgencyLevel - a.urgencyLevel;
        }
        return b.type - a.type;
    });

    return (
        <div className="flex flex-col w-full bg-white rounded-xl">
            <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900">הודעות כלליות</h2>
            </div>

            <div className="space-y-3">
                {sortedNotifications.map((notification: Notifications, index: number) => {
                    switch (notification.type) {
                        case NotificationType.Request:
                            return (
                                <RequestNotification
                                    key={notification._id}
                                    notification={notification}
                                />
                            );
                        case NotificationType.Reminder:
                            return (
                                <ReminderNotification
                                    key={notification._id}
                                    notification={notification}
                                />
                            );
                        default:
                            return null;
                    }
                })}
            </div>

            {!sortedNotifications.length && (
                <NoLoansSection
                    title="אין תזכורות"
                    description="הכל נקי כרגע!"
                />
            )}
        </div>
    );
};

export default GeneralNotificationsCard;