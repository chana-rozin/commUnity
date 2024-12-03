import * as React from 'react';
import { InputField } from './input';
import { RegistrationFormData } from './types';

export const RegistrationForm: React.FC = () => {
    const formFields: Array<{ id: keyof RegistrationFormData; placeholder: string }> = [
        { id: 'firstName', placeholder: 'שם פרטי' },
        { id: 'lastName', placeholder: 'שם משפחה' },
        { id: 'address', placeholder: 'כתובת מגורים' },
        { id: 'phone', placeholder: 'מס\' פלאפון' }
    ];

    return (
        <form className="flex flex-col mt-20 max-w-full text-sm leading-none min-h-[234px] text-neutral-500 w-[430px] max-md:mt-10">
            <div className="flex flex-col w-full max-md:max-w-full">
                {formFields.map((field) => (
                    <InputField
                        key={field.id}
                        id={field.id}
                        placeholder={field.placeholder}
                        type={field.id === 'phone' ? 'tel' : 'text'}
                    />
                ))}
            </div>
            <button
                type="submit"
                className="gap-1 self-stretch px-4 py-2 mt-20 text-base font-medium text-center text-white whitespace-nowrap bg-indigo-600 rounded-md max-md:mt-10"
            >
                וממשיכים
            </button>
        </form>
    );
};