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
        <div className="flex gap-4 items-start mt-5 w-full">
            <aside className="flex flex-col min-h-[909px] w-[200px] flex-shrink-0" role="complementary">
                <ProfileAside categories={categories} />
            </aside>
            {children}
        </div>
    );
}

