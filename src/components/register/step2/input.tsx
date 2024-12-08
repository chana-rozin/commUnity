import * as React from 'react';
import { InputFieldProps } from './types';

export const InputField: React.FC<InputFieldProps> = ({ placeholder, type = "text", id }) => {
    return (
        <div className="flex flex-col mt-4 w-full max-md:max-w-full">
            <div className="flex flex-col w-full max-md:max-w-full">
                <label htmlFor={id} className="sr-only">{placeholder}</label>
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    className="overflow-hidden flex-1 shrink gap-1 self-stretch px-3 py-3 w-full bg-white rounded-md border border-solid border-stone-300 min-h-[42px] max-md:max-w-full text-sm leading-none text-neutral-500"
                    aria-label={placeholder}
                />
            </div>
        </div>
    );
};