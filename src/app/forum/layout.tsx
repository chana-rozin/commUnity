"use client"
import React, { useState } from 'react'
import { usePathname } from "next/navigation";
import { ProfileAside } from '@/components/ProfileAside/ProfileAside';
import GeneralNotificationsCard from '@/components/GeneralNotificationsCard/GeneralNotificationsCard';
import { EventsNotificationsCard } from '@/components/EventsNotificationsCard/EventsNotificationsCard';
import { LoansNotificationsCard } from '@/components/LoansNotificationsCard/LoansNotificationsCard';


export default function ForumLayout({ children }: { children: React.ReactNode }) {

    const categories = [{ name: "ראשי", href: "/home", isActive: true }, { name: "שמורים", href: "/saved", isActive: false }]

    return (
        <div className="flex flex-row gap-4 items-start mt-5 w-full">
            <aside className="flex flex-col w-[211px] max-w-full" role="complementary">
                <ProfileAside categories={categories} />
            </aside>
            {children}
        </div>
    );
}

