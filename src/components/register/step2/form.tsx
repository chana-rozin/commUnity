import React, { useEffect } from 'react';
import { useState } from 'react';
import { RegistrationFormData } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from "react-hook-form";
import { formSchema, formTypes } from './formSchema'
import SearchableSelectWithAPI from '@/components/map/map'
import { Location, Address } from '@/types/general.type';
interface props {
    handleStep: (data: object) => void;
}
export const RegistrationForm: React.FC<props> = ({ handleStep }) => {
    const [address, setAddress] = useState<any>(null);
    useEffect(()=>{
        if(address){
            setAddressError(null)
        }
    },[address])
    const [addressError, setAddressError] = useState<string|null>(null);
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
        if(!address){
            setAddressError('נא להכניס כתובת מגורים');
            return;
        }
        const location:Location = {
            type: "Point",
            coordinates: [parseFloat(address.value.lon), parseFloat( address.value.lat)]
        }
        console.log('onSubmit');
        console.log(data);
        const dataToSave = {
            firstName: data.firstName,
            lastName: data.lastName,
            address: {
                country: address.value.address.country,
                city: address.value.address.city,
                houseNumber: address.value.address.house_number,
                street: address.value.address.road,
                neighborhood: address.value.address.suburb},
            location : location,
            phone: data.phone
        }
        console.log(dataToSave);
        
        handleStep(dataToSave);
    }

    return (
        <form className="flex flex-col mt-20 max-w-full text-sm leading-none min-h-[234px] text-neutral-500 w-[430px] max-md:mt-10" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="mt-9 text-3xl font-bold text-right text-neutral-950">
                איזה כיף שאת/ה כאן!
            </h1>
            <p className="self-start mt-0 text-base text-right text-neutral-950">
                רק עוד כמה פרטים קטנים ואנחנו שם!
            </p>
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
                <div className="flex flex-col mt-4 w-full max-md:max-w-full">
                    <div className="flex flex-col w-full max-md:max-w-full">
                        <input
                            {...register("phone")}
                            type='tel'
                            id='phone'
                            placeholder="מספר פלאפון"
                            className="overflow-hidden flex-1 shrink gap-1 self-stretch px-3 py-3 w-full bg-white rounded-md border border-solid border-stone-300 min-h-[42px] max-md:max-w-full text-sm leading-none text-neutral-500"
                            aria-label="מספר פלאפון"
                        />
                    </div>
                    {errors.phone && <span>{errors.phone.message}</span>}
                </div>
                <div className="flex flex-row mt-4 w-full max-md:max-w-full">
                    <div className="flex flex-col w-full max-md:max-w-full">
                        <SearchableSelectWithAPI setAddress={setAddress} inputPlaceholder={"כתובת מגורים"}/>
                        {addressError && <span>{addressError}</span>}
                    </div>
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