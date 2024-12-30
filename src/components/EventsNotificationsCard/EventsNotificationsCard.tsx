import * as React from "react";
import { EventCard } from "./EventCard";
import { useEventsByCommunityId } from "@/services/mutations/events";
import useUserStore from "@/stores/userStore";
import { NoLoansSection } from "../Loans/NoLoansSection";



export function EventsNotificationsCard() {
    const user = useUserStore((state) => state.user);
    const { data: events, isLoading, error } = useEventsByCommunityId(user?.neighborhood._id || "");
    return (
        <div className="flex flex-col w-full bg-white rounded-2xl">
            <div className="flex justify-between items-center w-full mb-4">
                <div className="flex flex-col items-start">
                    <h2 className="text-xl font-semibold text-black">אירועים</h2>
                    <div className="text-xs text-neutral-500">
                        {`${events?.length || 0} אירועים השבוע`}
                    </div>
                </div>
                <button
                    className="self-center px-6 py-2 text-sm font-medium text-indigo-600 bg-violet-50 border border-violet-300 rounded-full"
                    aria-label="ספר לי עוד על האירועים"
                    onClick={() => { window.location.href = "/events"; }}
                >
                    ספר לי עוד
                </button>
            </div>
            <div className="flex flex-col w-full space-y-4">
                {isLoading && <p className="text-center text-gray-500">טוען אירועים...</p>}
                {error && <p className="text-center text-red-500">שגיאה בטעינת הנתונים</p>}
                {events?.length ? (
                    events?.map((event, index) => (
                    <EventCard key={event._id} {...event} />
                ))
                ) : (
                    !isLoading && (
                        <NoLoansSection
                            title="אין אירועים"
                            description="כרגע אין אירועים קרובים בקהילה שלך."
                        />
                    )
                )}
                {}
            </div>
        </div>
    );
}
