"use client"
import React, { useState } from 'react'
import { usePathname } from "next/navigation";
import { ProfileAside } from '@/components/ProfileAside/ProfileAside';
import { EventsNotificationsCard } from '@/components/EventsNotificationsCard/EventsNotificationsCard';
import { LoansNotificationsCard } from '@/components/LoansNotificationsCard/LoansNotificationsCard';


export default function NeighborhoodHelpLayout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();
    const categories = [{ name: "ראשי", href: "/home", isActive: true }, { name: "שמורים", href: "/saved", isActive: false }]

    return (
        <div className="flex flex-wrap gap-4 items-start mt-5 w-full">
            <aside className="flex flex-col w-[211px] max-w-full" role="complementary">
                <ProfileAside categories={categories} />
            </aside>
            {children}
            <div className="flex flex-col flex-1 shrink basis-0 min-w-[260px]">
                <div className="flex flex-col p-5 w-full  bg-white rounded-2xl">
                    <LoansNotificationsCard />
                </div>
                <div className="flex flex-col p-5 mt-4 w-full bg-white rounded-2xl">
                    <EventsNotificationsCard />
                </div>
            </div>
        </div>
    );
}

