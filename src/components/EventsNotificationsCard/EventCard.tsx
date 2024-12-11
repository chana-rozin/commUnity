import * as React from "react";
import { Event } from "@/types/event.type";
import { formatDate } from "@/utils/dates";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import { useSaveEvent } from "@/services/mutations/events";  
import useUserStore from "@/stores/userStore";


export const EventCard: React.FC<Event> = ({
    _id,
    name,
    date,
    location,
}) => {
    const {user,setUser} = useUserStore();
    const saveMutation  = useSaveEvent(user, setUser);
    const isSaved = user?.savedEventsIds.includes(_id);

    const handleSaveEvent = () => {
        saveMutation.mutate({ eventId: _id , });
    };

    return (
        <div className="flex flex-col justify-between items-start p-4 w-full bg-violet-50 rounded-xl">
            {/* Date, Name, and Location */}
            <div className="flex flex-col justify-start items-start w-full text-xs leading-none text-neutral-950">
                <div className="font-medium text-gray-400">{formatDate(date)}</div>
                <div className="font-semibold text-sm text-neutral-950">{name}</div>
                <div className="text-xs text-neutral-600">{location}</div>
            </div>

            {/* Bottom Section for Action (e.g., Save Star Icon) */}
            <div className="flex gap-2 items-center mt-4 self-end">
                <button
                    onClick={handleSaveEvent}
                    className={`text-indigo-600`}
                >
                    {isSaved ? <TiStarFullOutline className="w-5 h-5" /> : <TiStarOutline className="w-5 h-5" />}
                </button>
            </div>
        </div>
    );
};
