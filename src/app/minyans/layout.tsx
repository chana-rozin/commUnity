"use client"
import React from "react";
import { usePathname } from "next/navigation";
import TabsController from "@/components/TabsController/TabsController";

const tabs = [{text: "מנינים קבועים", href: "/minyans/regular"}, {text: "מנינים מזדמנים", href: "/minyans/temporary"}]

export default function MinyansLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const currentTab = pathname.split("/").filter(Boolean).pop()=="regular"?"מנינים קבועים":"מנינים מזדמנים";

    return (
        <div className="mt-4">
            <TabsController defaultTab={currentTab} tabs={tabs}/>
            <div>{children}</div>
        </div>
    );
}
