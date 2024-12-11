"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileField } from "../../../components/Profile/ProfileField";
import { ProfileSection } from "@/components/Profile/ProfileSection";
import { profileSchema, ProfileFormData } from "@/types/profileComponent.type";
import useUserStore from "@/stores/userStore";
import { ImageUpload } from "@/components/uploadImage/uploadImage";
import { User } from "@/types/user.type"
import { updateUser } from '@/services/users'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const profileFields = [
    { name: "first_name", label: "שם פרטי", iconSrc: "...", disabled: false },
    { name: "last_name", label: "שם משפחה", iconSrc: "...", disabled: false },
    { name: "email", label: "כתובת דוא\"ל", iconSrc: "...", disabled: true },
    { name: "phone_number", label: "מס' פלאפון", iconSrc: "...", disabled: false },
    { name: "address.street", label: "רחוב", iconSrc: "...", disabled: false },
    { name: "address.houseNumber", label: "מספר בית", iconSrc: "...", disabled: false },
    { name: "address.city", label: "עיר", iconSrc: "...", disabled: false },
] as const;

const ProfilePage: React.FC = () => {
    const { user, setUser } = useUserStore();

    const defaultValues: ProfileFormData = {
        first_name: "...",
        last_name: "...",
        email: "...",
        phone_number: "...",
        address: {
            street: "...",
            city: "...",
            houseNumber: "..."
        },
        profile_picture_url: "..."
    };

    const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues,
    });

    React.useEffect(() => {
        if (user) {
            reset(user);
        }
    }, [user]);

    const onSubmit = async (data: ProfileFormData) => {
        try {
            console.log("Submitted data:", data);
            const updatedUser: User = { ...user!, ...data };
            await updateUser(user!._id!, updatedUser);
            setUser(updatedUser);
            toast.success("הפרטים עודכנו בהצלחה!");

        } catch (err) {
            console.error("Error updating user:", err);
            toast.error("שגיאה! נסה מאוחר יותר");
        }
    };

    const handleImageUpload = (url: string) => {
        setValue("profile_picture_url", url);
    };

    return (
        <>
            <div className="flex flex-col items-end self-stretch p-16 bg-white rounded-2xl">
                <div className="flex flex-col w-full max-md:px-5">
                    <header className="border-b border-solid border-b-slate-200 pb-4">
                        <h1 className="font-bold text-2xl">פרטי פרופיל</h1>
                        <p>כאן תוכל לשנות את פרטי הפרופיל שלך</p>
                    </header>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
                        <ProfileSection title="פרטים אישיים" description="זהו הפרופיל הראשי שיהיה גלוי לכולם">
                            <div className="space-y-4">
                                {profileFields.map((field) => (
                                    <ProfileField
                                        key={field.name}
                                        {...field}
                                        register={register}
                                        disabled={field.disabled || false}
                                        error={errors[field.name as keyof ProfileFormData]?.message}
                                    />
                                ))}
                            </div>
                        </ProfileSection>

                        <hr className="mt-8" />

                        <ProfileSection title="תמונת פרופיל" description="זה המקום שבו אנשים יראו את הפנים האמיתיות שלך">
                            <div className="flex gap-3">
                                <img
                                    src={watch("profile_picture_url")}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full"
                                />
                                <div className="w-[443px]">
                                <ImageUpload setImageUrl={handleImageUpload}/>
                                </div>
                            </div>
                        </ProfileSection>

                        <hr className="mt-8" />

                        <div className="flex justify-end mt-6 gap-2">
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
                                onClick={() => reset(user || defaultValues)}
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
        </>
    );
};

export default ProfilePage;
