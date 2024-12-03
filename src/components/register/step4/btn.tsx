import React from 'react';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({ children, className, onClick }) => (
    <button
        onClick={onClick}
        className={className}
        tabIndex={0}
        role="button"
    >
        {children}
    </button>
);