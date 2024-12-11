import { UseFormRegister } from "react-hook-form";
import { ProfileFormData } from "@/types/profileComponent.type";

type NestedKeys<T> = T extends object
    ? { [K in keyof T]: `${K & string}` | `${K & string}.${NestedKeys<T[K]>}` }[keyof T]
    : never;

interface ProfileFieldProps {
    name: NestedKeys<ProfileFormData>; // This now allows nested keys like "address.street"
    label: string;
    iconSrc: string;
    register: UseFormRegister<ProfileFormData>;
    error?: string;
    disabled?: boolean;
}

export const ProfileField: React.FC<ProfileFieldProps> = ({
    label,
    iconSrc,
    name,
    error,
    register,
    disabled=false,
}) => {
    const inputId = `profile-${name}`;

    return (
        <div className="flex flex-col">
            <div className="flex overflow-hidden flex-wrap gap-5 items-center px-3 py-3.5 max-w-full bg-white border border-solid border-neutral-200 min-h-[48px] rounded-[40px] w-[520px]">
                <label htmlFor={inputId} className="self-stretch my-auto w-[148px]">
                    {label}
                </label>
                <input
                    id={inputId}
                    type={name === "email" ? "email" : "text"}
                    className="flex-1 bg-transparent border-none outline-none"
                    aria-invalid={error ? "true" : "false"}
                    {...register(name)} // Make sure the full path (e.g., "address.street") is passed to register
                    disabled ={disabled}
                />
                <img
                    src={iconSrc}
                    alt=""
                    className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                    aria-hidden="true"
                />
            </div>
            {error && (
                <span role="alert" className="mt-1 text-xs text-red-500">
                    {error}
                </span>
            )}
        </div>
    );
};
