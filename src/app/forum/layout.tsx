"use client"
import React from 'react'
import { ProfileAside } from '@/components/ProfileAside/ProfileAside';

export default function ForumLayout({ children }: { children: React.ReactNode }) {

    const categories = [{ name: "ראשי", href: "/home", isActive: true }, { name: "שמורים", href: "/forum/saved", isActive: false }]

    return (
        <div className="flex gap-4 items-start mt-5 w-full">
            <aside className="flex flex-col min-h-[909px] w-[200px] flex-shrink-0" role="complementary">
                <ProfileAside categories={categories} />
            </aside>
            {children}
        </div>
    );
}

