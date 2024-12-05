import * as React from "react";
import { EventCard } from "./EventCard";
import { Event } from "@/types/event.type";
import { useEvents } from "@/services/mutations/events";  


export function EventsNotificationsCard() {
    const { data: events, isLoading, error } = useEvents();
    return (
        <div className="flex flex-col mt-4 w-full bg-white rounded-2xl">
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
                    onClick={() => {window.location.href = "/events";}}                
                >
                    ספר לי עוד
                </button>
            </div>
            <div className="flex flex-col w-full space-y-4">
                {events?.map((event, index) => (
                    <EventCard key={event._id} {...event} />
                ))}
            </div>
        </div>
    );
}
