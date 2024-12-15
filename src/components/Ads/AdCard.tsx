import * as React from "react";
import Popup from "../PopUp/PopUp";
import { Ad } from "@/types/ad.type";

interface AdCardProps extends Pick<Ad, "name" | "description" | "createdDate" | "expirationDate"> {}

const AdCard: React.FC<AdCardProps> = ({ name, description, createdDate, expirationDate }) => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const formattedcDate = createdDate ? new Date(createdDate).toLocaleString() : "No Date Provided";
  const formattedeDate = expirationDate ? new Date(expirationDate).toLocaleString() : "No Date Provided";

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className="relative flex flex-col p-5 bg-white rounded-xl shadow-md min-h-[196px] w-[200px]">
      {/* Title */}
      <header className="mb-2">
        <h3 className="text-lg font-bold text-black truncate">{name || "Untitled Event"}</h3>
      </header>

      {/* Read More Button */}
      <button
        className="mt-auto px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-full hover:bg-indigo-500"
        onClick={openPopup}
      >
        קרא עוד
      </button>

      {/* Popup */}
<Popup
  title={name || "Untitled Ad"}
  items={[
    { type: "text", value: `createdDate: ${formattedcDate}` },
    { type: "text", value: `Description: ${description || "No description available."}` },
  ]}
  isOpen={isPopupOpen}
  onClose={closePopup}
/>

    </div>
  );
};

export default AdCard;
