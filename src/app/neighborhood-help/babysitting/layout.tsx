"use client"
import React, { useState } from 'react'
import { usePathname } from "next/navigation";
import TabsController from '../../../components/TabsController/TabsController';
import { ProfileAside } from '@/components/ProfileAside/ProfileAside';
import { Babysitting } from '@/services/mongoDB/models';

export default function BabysittingLayout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();

    const tabs = [{ text: "בקשות פעילות", href: "/neighborhood-help/babysitting/requests" }, { text: "מצטיינות", href: "/neighborhood-help/babysitting/top-rated" }];

    const currentTab = pathname.split("/").filter(Boolean).pop() == "requests" ? "בקשות פעילות" : "מצטיינות";
    const currentCategory = pathname.includes("/babysitting/") ? "babysitting" : "loans";
    const categories = [{ name: "השאלות", href: "/neighborhood-help/loans", isActive: currentCategory === "loans" }, { name: "שמרטפות", href: "/neighborhood-help/babysitting", isActive: currentCategory === "babysitting" }];

    return (
        <div className="flex flex-col w-full max-w-[750px] max-md:pl-5">
            <TabsController defaultTab={currentTab} tabs={tabs} />
            <div className="flex overflow-hidden flex-wrap gap-5 justify-center content-center items-center px-4 py-6 w-full bg-indigo-100 rounded-2xl min-h-[669px] max-md:max-w-full">
                {children}
            </div>
        </div>
    );
}