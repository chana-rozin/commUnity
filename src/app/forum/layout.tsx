"use client"
import React, { useState } from 'react'
import { usePathname } from "next/navigation";
import { ProfileAside } from '@/components/ProfileAside/ProfileAside';
import GeneralNotificationsCard from '@/components/GeneralNotificationsCard/GeneralNotificationsCard';
import { EventsNotificationsCard } from '@/components/EventsNotificationsCard/EventsNotificationsCard';
import { LoansNotificationsCard } from '@/components/LoansNotificationsCard/LoansNotificationsCard';


export default function NeighborhoodHelpLayout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();
    const categories = [{ name: "ראשי", href: "/home", isActive: true }, { name: "שמורים", href: "/saved", isActive: false }]

    return (
        <div className="flex flex-wrap gap-4 items-start mt-5 w-full">
            {children}
        </div>
    );
}

