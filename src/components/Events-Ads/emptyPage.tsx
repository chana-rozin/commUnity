'use client';
import React from 'react';

interface EmptyStateProps {
  type: 'events' | 'ads';
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[300px] bg-white rounded-2xl p-6">
      <div className="text-gray-500 text-lg font-medium mb-2">
        {type === 'events' ? 'אין אירועים זמינים' : 'אין מודעות זמינות'}
      </div>
      <p className="text-gray-400 text-sm text-center">
        {type === 'events' 
          ? 'לא נמצאו אירועים להצגה כרגע.'
          : 'לא נמצאו מודעות להצגה כרגע.'
        }
      </p>
    </div>
  );
};