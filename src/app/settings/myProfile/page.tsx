"use client"
import * as React from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileField } from "./ProfileField";
import { ProfileSection } from "./ProfileSection";
import { ProfileUploader } from "./ProfileUploader";
import { profileSchema, ProfileFormData } from "./types";
import useUserStore from "@/stores/userStore";
import { useState } from "react";

const profileFields = [
    { name: "firstName", label: "שם פרטי", iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/9c803c88810db6bcfef2c484821b7daa9f0720284286d0fe1e690ed18550c0f3?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611" },
    { name: "lastName", label: "שם משפחה", iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/9c803c88810db6bcfef2c484821b7daa9f0720284286d0fe1e690ed18550c0f3?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611"  },
    { name: "email", label: 'כתובת דוא"ל', iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c48eb5f185be604df5861969cc1afd75eb345982ec663a0469dc0aa4fa486ad?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611" },
    { name: "phone", label: "מס' פלאפון", iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/246a2deded78e84c61ec202bcedf3662208884039e4bd099dc29c9b3f8e3cdcf?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611" },
    { name: "address.street", label: "רחוב", iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/aed962f100b5171d07e86f7517070af2093d66c51a93aa10d9e728728d183a01?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611" },
    { name: "address.houseNumber", label: "מספר בית", iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/aed962f100b5171d07e86f7517070af2093d66c51a93aa10d9e728728d183a01?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611"},
    { name: "address.city", label: "עיר", iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/aed962f100b5171d07e86f7517070af2093d66c51a93aa10d9e728728d183a01?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611" }
] as const;



const ProfilePage: React.FC = () => {

    const { user, setUser } = useUserStore(); // Assuming you have setUser in your store to update user
    const defaultValues: ProfileFormData = user
        ? {
            firstName: user.first_name || '',
            lastName: user.last_name || '',
            email: user.email || '',
            phone: user.phone_number || '',
            address: {
                street: user.address?.street || '',
                city: user.address?.city || '',
                houseNumber: user.address?.houseNumber || ''
            }
        }
        : {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: { street: '', city: '', houseNumber: '' }
        };

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues
    });

    const onSubmit = async (data: ProfileFormData) => {
        console.log(data);
        try {
            // TODO: Call your service to update the user in the DB
            // await updateUser(data);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="flex flex-col items-end self-stretch pt-4 pr-4 pb-24 bg-white rounded-2xl" >
            <div className="flex flex-col px-8 pt-8 w-full max-md:px-5" >
                <div className="flex flex-col items-start w-full min-h-[684px] max-md:max-w-full" >
                    <header className="flex gap-4 items-center self-stretch pb-5 w-full leading-none text-right border-b border-solid border-b-slate-200 max-md:max-w-full" >
                        <div className="flex flex-col flex-1 shrink self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full" >
                            <h1 className="text-lg font-bold tracking-normal text-slate-800 max-md:max-w-full" >
                                פרטי פרופיל
                            </h1>
                            <p className="mt-1 text-xs text-slate-600 max-md:max-w-full" >
                                כאן תוכל לשנות את פרטי הפרופיל שלך
                            </p>
                        </div>
                    </header>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
                        <ProfileSection
                            title="פרטים אישיים"
                            description="זהו הפרופיל הראשי שיהיה גלוי לכולם"
                        >
                            <div className="flex flex-col leading-none text-right min-w-[240px] text-slate-600 w-[520px] max-md:max-w-full space-y-4" >
                                {profileFields.map((field) => (
                                    <ProfileField
                                        key={field.name}
                                        {...field}
                                        register={register}
                                        error={errors[field.name as keyof ProfileFormData]?.message}
                                    />
                                ))}

                            </div>
                        </ProfileSection>

                        <hr className="mt-8 border-t border-slate-200 w-full" aria-hidden="true" />

                        <ProfileSection
                            title="תמונת פרופיל"
                            description="זה המקום שבו אנשים יראו את הפנים האמיתיות שלך"
                        >
                            <div className="flex flex-wrap grow shrink gap-3 items-start min-w-[240px] w-[468px] max-md:max-w-full" >
                                <img
                                    src={user?.profile_picture_url}
                                    alt=""
                                    className="object-contain shrink-0 w-16 aspect-square rounded-full"
                                />
                                <ProfileUploader />
                            </div>
                        </ProfileSection>

                        <hr className="mt-8 border-t border-slate-200 w-full" aria-hidden="true" />

                        <div className="flex gap-2 justify-end mt-6 text-sm font-bold tracking-normal leading-none" >
                            <button
                                type="submit"
                                className="flex overflow-hidden gap-2 justify-center items-center px-4 py-2.5 text-white bg-indigo-600 rounded-[1234px] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="self-stretch my-auto" > שמור שינויים </span>
                                < img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/be2cee3fb50f34680134c6d99a00e4dba01cc6102e91d86a470b54a43ffb740e?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611"
                                    alt=""
                                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                                    aria-hidden="true"
                                />
                            </button>
                            < button
                                type="button"
                                className="flex overflow-hidden gap-2 justify-center items-center px-4 py-2.5 whitespace-nowrap border border-solid border-slate-300 rounded-[1234px] text-slate-600 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                            >
                                <span className="self-stretch my-auto" > ביטול </span>
                                < img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4713f7beb10966f3e3d9cb208bcdf41eddf7c1ccdf82297fe442808accfc6d0?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611"
                                    alt=""
                                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
