import * as React from 'react';
import { NavigationButtonProps } from './types';

export const NavigationButton: React.FC<NavigationButtonProps> = ({ label, onClick }) => {
    return (
        <button
            className="gap-1 self-stretch px-4 py-2 bg-indigo-600 rounded-md text-white"
            onClick={onClick}
        >
            {label}
        </button>
    );
};