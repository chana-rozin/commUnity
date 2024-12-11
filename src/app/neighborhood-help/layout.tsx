"use client"
import React, { useState } from 'react'
import { usePathname } from "next/navigation";
import { ProfileAside } from '@/components/ProfileAside/ProfileAside';
import {LoansNotificationsCard} from '@/components/LoansNotificationsCard/LoansNotificationsCard';
import { EventsNotificationsCard } from '@/components/EventsNotificationsCard/EventsNotificationsCard';

export default function NeighborhoodHelpLayout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();
    const currentCategory = pathname.includes("/babysitting/") ? "babysitting" : "loans";
    const categories = [{ name: "השאלות", href: "/neighborhood-help/loans", isActive: currentCategory === "loans" }, { name: "שמרטפות", href: "/neighborhood-help/babysitting/requests", isActive: currentCategory === "babysitting" }];

    return (
        <div className="flex w-full mt-8 gap-5">
            <aside className="flex flex-col min-h-[909px] w-[211px] max-w-full" role="complementary">
                <ProfileAside categories={categories} />
            </aside>
            {children}
            <div className="flex justify-end flex-1 shrink basis-0 min-w-[260px]">
                <div className="flex flex-col p-5 w-full max-w-[350px] bg-white rounded-2xl">
                    <EventsNotificationsCard />
                </div>
            </div>
        </div>
    );
}