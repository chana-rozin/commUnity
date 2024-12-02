
import * as React from "react";
import Link from 'next/link';

type ProfileHeaderProps = {
    name: string;
    address: string;
    avatar: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, address, avatar }) => {

    return (
        <div className="flex flex-col justify-center items-center max-w-full w-[131px]">
            <img
                loading="lazy"
                src={avatar}
                alt={`Profile picture of ${name}`}
                className="object-contain aspect-square w-[67px]"
            />
            <div className="flex flex-col justify-center items-center mt-3.5">
                <div className="text-base text-neutral-950">{name}</div>
                <div className="text-xs font-medium leading-none text-neutral-400">
                    {address}
                </div>
            </div>
            <Link
                className="gap-1 self-stretch px-4 py-2 mt-3.5 text-sm font-medium leading-none text-center text-white bg-indigo-600 rounded-md"
                aria-label="View my profile"
                href="/myProfile"
            >
                הפרופיל שלי
            </Link>
        </div>
    );
};