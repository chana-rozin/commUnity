import * as React from 'react';
import { InputFieldProps } from './step1/types';

export const InputField: React.FC<InputFieldProps> = ({
    label,
    type = 'text',
    value,
    placeholder,
    icon,
    id,
    name,
    onInputChange
}) => {
    function onChange(event: any) {
        onInputChange(event.target.name, event.target.value);
        event.preventDefault();
    }
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={id} className="text-base text-right text-neutral-700">
                {label}
            </label>
            <div className="flex overflow-hidden gap-1 items-center px-3 py-3 mt-1 w-full text-sm leading-none bg-white rounded-md border border-solid border-stone-300 min-h-[42px]">
                <input
                    type={type}
                    id={id}
                    value={value}
                    placeholder={placeholder}
                    name={name}
                    onChange={onChange}
                    className="flex-1 shrink self-stretch my-auto basis-0 text-neutral-500 outline-none"
                />
                {icon && (
                    <img
                        loading="lazy"
                        src={icon}
                        alt=""
                        className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                    />
                )}
            </div>
        </div>
    );
};