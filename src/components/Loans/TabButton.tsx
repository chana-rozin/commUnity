import * as React from 'react';

export interface TabProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const TabButton: React.FC<TabProps> = ({ label, isActive = false, onClick,
}) => {
  return (
    <div
      role="tab"
      aria-selected={isActive}
      tabIndex={0}
      onClick={onClick}
      className={`self-stretch p-3 my-auto relative ${
        isActive
          ? 'bg-violet-50 shadow-sm text-indigo-600 cursor-pointer'
          : 'text-neutral-700 cursor-pointer'
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-[3px] bg-indigo-600 rounded"></span>
      )}
    </div>
  );
};
