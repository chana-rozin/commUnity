"use client";
import * as React from "react";

export interface PopupProps {
  title: string;
  text: string;
  onClose: () => void;
  buttons?: React.ReactNode; // Optional additional buttons
}

export const Popup: React.FC<PopupProps> = ({ title, text, onClose, buttons }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-[400px] max-h-[80%] overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-600 hover:text-black"
          >
            ✖
          </button>
        </header>

        {/* Body */}
        <div className="p-4 text-gray-700">
          <p>{text}</p>
        </div>

        {/* Footer */}
        {buttons && (
          <footer className="p-4 border-t border-gray-300 flex justify-end gap-2">
            {buttons}
          </footer>
        )}
      </div>
    </div>
  );
};
