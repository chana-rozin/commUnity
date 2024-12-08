import * as React from "react";

interface PopupProps {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ title, content, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          aria-label="Close Popup"
        >
          ✖
        </button>

        {/* Popup Title */}
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>

        {/* Popup Content */}
        <div className="mt-4 text-sm text-gray-700">{content}</div>
      </div>
    </div>
  );
};

export default Popup;
