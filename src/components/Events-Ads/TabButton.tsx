import React from 'react';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={`
        px-4 py-3 text-sm font-medium 
        ${isActive 
          ? 'text-violet-700 border-b-2 border-violet-700' 
          : 'text-neutral-500 hover:text-neutral-700'}
      `}
    >
      {label}
    </button>
  );
};