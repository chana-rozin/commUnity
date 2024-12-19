// app/settings/layout.tsx
"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import TabsController from "@/components/TabsController/TabsController";

const tabs = [{text: "כללי", href: "/settings/preferences"}, {text: "הפרופיל שלי", href: "/settings/myProfile"}]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const currentTab = pathname.split("/").filter(Boolean).pop()=="preferences"?"כללי":"הפרופיל שלי";

    return (
        <div className="mt-4">
            <h1 className="m-4 text-2xl font-bold">הגדרות</h1>
            <TabsController defaultTab={currentTab} tabs={tabs}/>
            <div>{children}</div>
        </div>
    );
}
