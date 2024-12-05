import React from "react";

interface PopupProps {
  title: string;
  text: React.ReactNode; // This will allow dynamic content like forms
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ title, text, onClose }) => {
  return (
    <div className="popup-overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="popup-content bg-white p-6 rounded-lg max-w-lg">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="mt-4">{text}</div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        >
          סגור
        </button>
      </div>
    </div>
  );
};

// Export Popup component
export { Popup };
