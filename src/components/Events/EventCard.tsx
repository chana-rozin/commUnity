import * as React from "react";
import { Event } from "@/types/event.type";

interface EventCardProps extends Pick<Event, "name" | "description" | "date" | "location" | "createdDate" | "active" | "AuthorizedIds"> {
  buttonIcon?: string;
  bookmarkIcon?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  name,
  description,
  date,
  location,
  createdDate,
  active,
  AuthorizedIds,
  buttonIcon,
  bookmarkIcon,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const formattedDate = date ? new Date(date).toDateString() : "No Date Provided";

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div ref={cardRef} className="relative flex flex-col p-5 bg-white rounded-xl shadow-md min-h-[196px] w-[200px]">
      {/* Title */}
      <header className="mb-2">
        <h3 className="text-lg font-bold text-black break-words">{name || "Untitled Event"}</h3>
      </header>

      {/* Date */}
      <div className="text-sm text-gray-500 mb-2">
        <time>{formattedDate}</time>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-4">
        {description || "No description available for this event."}
      </p>

      {/* Toggle Button */}
      <button
        className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-full hover:bg-indigo-500"
        onClick={toggleModal}
      >
        {buttonIcon && <img src={buttonIcon} alt="button icon" className="w-4 h-4" />}
        Read More
      </button>

      {/* Bookmark */}
      <div className="mt-3 flex justify-end">
        {bookmarkIcon && (
          <img
            src={bookmarkIcon}
            alt="bookmark icon"
            className="w-6 h-6"
          />
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] max-h-[600px] overflow-y-auto">
            <header className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">{name || "Untitled Event"}</h2>
              <button
                className="text-gray-600 hover:text-black"
                onClick={toggleModal}
              >
                ✖
              </button>
            </header>
            <div className="space-y-4">
              <p><strong>Date:</strong> {formattedDate}</p>
              <p><strong>Description:</strong> {description || "No description available."}</p>
              <p><strong>Location:</strong> {location || "Unknown"}</p>
              <p><strong>Published On:</strong> {createdDate ? new Date(createdDate).toDateString() : "N/A"}</p>
              <p><strong>Active:</strong> {active ? "Yes" : "No"}</p>
              <p><strong>Authorized Groups:</strong> {AuthorizedIds?.length ? AuthorizedIds.join(", ") : "None"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
