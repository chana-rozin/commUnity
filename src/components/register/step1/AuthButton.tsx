import * as React from 'react';
import { AuthButtonProps } from './types';

export const AuthButton: React.FC<AuthButtonProps> = ({
    children,
    variant = 'primary',
    onClick,
    type = 'button',
    }) => {
    const baseStyles = "gap-1 px-4 py-2 text-base font-medium text-center rounded-md w-full";
    const variantStyles = {
        primary: "bg-indigo-600 text-white",
        secondary: "bg-neutral-100 text-indigo-900"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variantStyles[variant]}`}
        >
            {children}
        </button>
    );
};