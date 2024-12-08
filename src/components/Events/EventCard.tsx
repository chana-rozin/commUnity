import * as React from "react";
import Popup from "../PopUp/PopUp";
import { Event } from "@/types/event.type";

interface EventCardProps extends Pick<Event, "name" | "description" | "date" | "location"> {}

const EventCard: React.FC<EventCardProps> = ({ name, description, date, location }) => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const formattedDate = date ? new Date(date).toLocaleString() : "No Date Provided";

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className="relative flex flex-col p-5 bg-white rounded-xl shadow-md min-h-[196px] w-[200px]">
      {/* Title */}
      <header className="mb-2">
        <h3 className="text-lg font-bold text-black truncate">{name || "Untitled Event"}</h3>
      </header>

      {/* Location */}
      <div className="flex items-center text-sm text-gray-500 mb-1">
        <img
          src="https://img.icons8.com/ios-glyphs/30/000000/place-marker.png"
          alt="Location Icon"
          className="w-4 h-4 mr-1"
        />
        <span>{location || "Unknown Location"}</span>
      </div>

      {/* Date */}
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <img
          src="https://img.icons8.com/ios-glyphs/30/000000/clock--v1.png"
          alt="Clock Icon"
          className="w-4 h-4 mr-1"
        />
        <time>{formattedDate}</time>
      </div>

      {/* Read More Button */}
      <button
        className="mt-auto px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-full hover:bg-indigo-500"
        onClick={openPopup}
      >
        Read More
      </button>

      {/* Popup */}
      <Popup
        title={name || "Untitled Event"}
        content={
          <div>
            <p><strong>Location:</strong> {location || "Unknown Location"}</p>
            <p><strong>Date:</strong> {formattedDate}</p>
            <p><strong>Description:</strong> {description || "No description available."}</p>
          </div>
        }
        isOpen={isPopupOpen}
        onClose={closePopup}
      />
    </div>
  );
};

export default EventCard;
