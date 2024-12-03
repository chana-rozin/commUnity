import * as React from "react";
import { EventCardProps } from "./types";

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  description,
  buttonText,
  buttonIcon,
  bookmarkIcon,
}) => {
  return (
    <article className="flex flex-col p-5 bg-white rounded-xl shadow-md min-h-[196px] w-[200px]">
  {/* Title */}
  <header className="mb-2">
    <h3 className="text-lg font-bold text-black truncate">{title || "Untitled Ad"}</h3>
  </header>

  {/* Date */}
  <div className="text-sm text-gray-500 mb-2">
    <time>{date || "No Date Provided"}</time>
  </div>

  {/* Description */}
  <p className="text-sm text-gray-700 mb-4">
    {description || "No description available for this ad."}
  </p>

  {/* Button */}
  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-full hover:bg-indigo-500">
    {buttonIcon && <img src={buttonIcon} alt="button icon" className="w-4 h-4" />}
    {buttonText || "Learn More"}
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
</article>

  );
};

export default EventCard;
