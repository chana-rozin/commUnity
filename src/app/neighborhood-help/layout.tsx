"use client"
import React, { useState } from 'react'
import { usePathname } from "next/navigation";
import { ProfileAside } from '@/components/ProfileAside/ProfileAside';

export default function NeighborhoodHelpLayout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();
    const currentCategory = pathname.includes("/babysitting/") ? "babysitting" : "loans";
    const categories = [{ name: "השאלות", href: "/neighborhood-help/loans", isActive: currentCategory === "loans" }, { name: "שמרטפות", href: "/neighborhood-help/babysitting/requests", isActive: currentCategory === "babysitting" }];

    return (
        <div className="flex flex-wrap gap-4 items-start mt-5 w-full">
            <aside className="flex flex-col w-[211px] max-w-full" role="complementary">
                <ProfileAside categories={categories} />
            </aside>
            {children}
        </div>
    );
}

