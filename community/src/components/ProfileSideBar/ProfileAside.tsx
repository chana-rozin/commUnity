"use client"
import * as React from "react";
import { ProfileHeader } from "./ProfileHeader";
import { NavItem } from "./NavItem";
import useUserStore from '@/stores/userStore';
import { NavItemProps } from "@/types/general.type";
import Link from 'next/link';

type ProfileAsideProps = {
    navItems: NavItemProps[];
    saved: boolean;
}

export const ProfileAside: React.FC<ProfileAsideProps> = ({ navItems, saved = false }) => {

    const user = useUserStore((state) => state.user);

    return (
        <main className="flex flex-col justify-center items-center w-full bg-white rounded-2xl min-h-[678px]">
            <ProfileHeader
                name={`${user?.first_name} ${user?.last_name}`}
                address={`${user?.address.street} ${user?.address.houseNumber}`}
                //TODO: Change the default image to something else
                avatar={user?.profile_picture_url.url || "https://cdn.builder.io/api/v1/image/assets/TEMP/38450d9390fdb4ad03074d5f3395be324567170775fc0c6290182e6d99bbe05d?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611"}
            />

            <nav className="flex flex-col justify-between items-center mt-8 text-sm leading-none whitespace-nowrap bg-white min-h-[54px]">
                <Link className={`text-center text-${saved ? "gray-400" : "indigo-500"}`} href="/home">בית</Link>
                <Link className={`text-center text-${!saved ? "gray-400" : "indigo-500"}`} href="/home">שמורים</Link>
            </nav>

            <section className="flex flex-col self-stretch pl-5 mt-8 w-full text-base text-neutral-950">
                {navItems.map((item, index) => (
                    <NavItem
                        key={index}
                        icon={item.icon}
                        text={item.text}
                        isActive={item.isActive}
                    />
                ))}
            </section>
        </main>
    );
};