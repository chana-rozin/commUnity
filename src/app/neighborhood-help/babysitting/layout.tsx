"use client"
import React, { useState } from 'react'
import { usePathname, useRouter } from "next/navigation";
import TabsController from '../../../components/TabsController/TabsController';

export default function BabysittingLayout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();
    const router = useRouter();

    const tabs = [{ text: "בקשות פעילות", href: "/neighborhood-help/babysitting/requests" },
        { text: "הפעילות שלי", href: "/neighborhood-help/babysitting/myActivity" }];

    const currentPath = pathname.split("/").filter(Boolean).pop()
    let currentTab: string;
    switch (currentPath) {
        case "requests":{
            currentTab = "בקשות פעילות";
            break;
        }
        case "myActivity":{
            currentTab = "הפעילות שלי";
            break;
        }
        default: {
            currentTab = "בקשות פעילות";
            router.replace("/neighborhood-help/babysitting/requests");
            break;
        }
    }

    return (
        <div className="flex flex-col w-full flex-grow ">
            <TabsController defaultTab={currentTab} tabs={tabs} />
            {children}
        </div>
    );
}