import React from "react";

// Define the structure of the array items the Popup receives
interface PopupItem {
    type: "text" | "button" | "input";
    label?: string; // For input fields or buttons
    value?: string; // For input default values or display text
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange handler
    onClick?: () => void; // For button actions
    inputType?: string; // Add optional input type (e.g., "text", "date", "number")
}

interface PopupProps {
    title: string;
    content: any; // Array of items to display
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: () => void; // Optional submit handler for form-like popups
}

const GenericPopup: React.FC<PopupProps> = ({ title, content, isOpen, onClose, onSubmit }) => {
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
                <div className="mt-4 space-y-4">
                    {content}
                </div>

                {/* Submit Button for Input Popups */}
                {onSubmit && (
                    <button
                        onClick={onSubmit}
                        className="mt-6 w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-medium"
                    >
                        Add
                    </button>
                )}
            </div>
        </div>
    );
};

export default GenericPopup;