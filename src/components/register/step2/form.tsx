import * as React from 'react';
import { InputField } from './input';
import { RegistrationFormData } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from "react-hook-form";
import { formSchema, formTypes } from './formSchema'
interface props {
    handleStep: (data: object) => void;
}
export const RegistrationForm: React.FC<props> = ({ handleStep }) => {
    const formFields: Array<{ id: keyof RegistrationFormData; placeholder: string }> = [
        { id: 'firstName', placeholder: 'שם פרטי' },
        { id: 'lastName', placeholder: 'שם משפחה' },
        { id: 'address', placeholder: 'כתובת מגורים' },
        { id: 'phone', placeholder: 'מס\' פלאפון' }
    ];
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<formSchema>({ resolver: zodResolver(formTypes) });

    const onSubmit: SubmitHandler<formSchema> = async (data) => {
        console.log('onSubmit');
        console.log(data);
        const dataToSave = {
            firstName: data.firstName,
            lastName: data.lastName,
            address: {
                city: data.city,
                houseNumber: data.houseNumber,
                street: data.street,
            },
            phone: data.phone
        }
        handleStep(dataToSave);
    }

    return (
        <form className="flex flex-col mt-20 max-w-full text-sm leading-none min-h-[234px] text-neutral-500 w-[430px] max-md:mt-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col w-full max-md:max-w-full">
                <div className="flex flex-col mt-4 w-full max-md:max-w-full">
                    <div className="flex flex-col w-full max-md:max-w-full">
                        <input
                            {...register("firstName")}
                            type='text'
                            id='firstName'
                            placeholder='שם פרטי'
                            className="overflow-hidden flex-1 shrink gap-1 self-stretch px-3 py-3 w-full bg-white rounded-md border border-solid border-stone-300 min-h-[42px] max-md:max-w-full text-sm leading-none text-neutral-500"
                            aria-label='שם פרטי'
                        />
                    </div>
                    {errors.firstName && <span>{errors.firstName.message}</span>}
                </div>
                <div className="flex flex-col mt-4 w-full max-md:max-w-full">
                    <div className="flex flex-col w-full max-md:max-w-full">
                        <input
                            {...register("lastName")}
                            type='text'
                            id='lastName'
                            placeholder='שם משפחה'
                            className="overflow-hidden flex-1 shrink gap-1 self-stretch px-3 py-3 w-full bg-white rounded-md border border-solid border-stone-300 min-h-[42px] max-md:max-w-full text-sm leading-none text-neutral-500"
                            aria-label='שם משפחה'
                        />
                    </div>
                    {errors.lastName && <span>{errors.lastName.message}</span>}
                </div>
                <br />
                <p>כתובת מגורים</p>
                <div className="flex flex-row mt-4 w-full max-md:max-w-full">
                    <div className="flex flex-col w-full max-md:max-w-full">
                        <input
                            {...register("city")}
                            type='text'
                            id='city'
                            placeholder='עיר'
                            className="overflow-hidden flex-1 shrink gap-1 self-stretch px-3 py-3 w-full bg-white rounded-md border border-solid border-stone-300 min-h-[42px] max-md:max-w-full text-sm leading-none text-neutral-500"
                            aria-label='עיר'
                        />
                        {errors.city && <span>{errors.city.message}</span>}
                    </div>
                    <div className="flex flex-col w-full max-md:max-w-full">
                        <input
                            {...register("street")}
                            type='text'
                            id='street'
                            placeholder='רחוב'
                            className="overflow-hidden flex-1 shrink gap-1 self-stretch px-3 py-3 w-full bg-white rounded-md border border-solid border-stone-300 min-h-[42px] max-md:max-w-full text-sm leading-none text-neutral-500"
                            aria-label='רחוב'
                        />
                        {errors.street && <span>{errors.street.message}</span>}
                    </div>
                    <div className="flex flex-col w-full max-md:max-w-full">
                        <input
                            {...register("houseNumber")}
                            type='text'
                            id='houseNumber'
                            placeholder="מס' בית/ בנין"
                            className="overflow-hidden flex-1 shrink gap-1 self-stretch px-3 py-3 w-full bg-white rounded-md border border-solid border-stone-300 min-h-[42px] max-md:max-w-full text-sm leading-none text-neutral-500"
                            aria-label="מס' בית/ בנין"
                        />
                        {errors.houseNumber && <span>{errors.houseNumber.message}</span>}
                    </div>
                </div>
                <div className="flex flex-col mt-4 w-full max-md:max-w-full">
                    <div className="flex flex-col w-full max-md:max-w-full">
                        <input
                            {...register("phone")}
                            type='tel'
                            id='phone'
                            placeholder="מס\' פלאפון"
                            className="overflow-hidden flex-1 shrink gap-1 self-stretch px-3 py-3 w-full bg-white rounded-md border border-solid border-stone-300 min-h-[42px] max-md:max-w-full text-sm leading-none text-neutral-500"
                            aria-label="מס\' פלאפון"
                        />
                    </div>
                    {errors.phone && <span>{errors.phone.message}</span>}
                </div>
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