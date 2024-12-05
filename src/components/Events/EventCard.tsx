import * as React from "react";
import { Event } from "@/types/event.type";

interface EventCardProps extends Pick<Event, "name" | "date" | "location"> {}

const EventCard: React.FC<EventCardProps> = ({ name, date, location }) => {
  const formattedDate = date
    ? new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "No Time Provided";

  return (
    <div className="relative flex flex-col p-4 bg-white rounded-xl shadow-md min-h-[120px] w-[200px]">
      {/* Title */}
      <header className="mb-2">
        <h3 className="text-lg font-bold text-black truncate">{name || "Untitled Event"}</h3>
      </header>

      {/* Location */}
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21.75c4.556-4.046 7.5-8.112 7.5-11.625A7.5 7.5 0 0 0 12 2.625a7.5 7.5 0 0 0-7.5 7.5c0 3.513 2.944 7.579 7.5 11.625z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5z"
          />
        </svg>
        <span>{location || "Unknown Location"}</span>
      </div>

      {/* Time */}
      <div className="flex items-center text-sm text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75v4.5l2.25 2.25m-2.25-9a9 9 0 1 1 0 18 9 9 0 0 1 0-18z"
          />
        </svg>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default EventCard;
