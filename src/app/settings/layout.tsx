// app/settings/layout.tsx
"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import TabsController from "@/components/TabsController/TabsController";

const tabs = [{text: "כללי", href: "/settings/preferences"}, {text: "הפרופיל שלי", href: "/settings/myProfile"}, {text: "הקהילות שלי", href: "/settings/myCommunities"}]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const route = pathname.split("/").filter(Boolean).pop()

    const currentTab = route=="preferences"?"כללי":(route=="myProfile")?"הפרופיל שלי":"הקהילות שלי";

    return (
        <div className="mt-4">
            <h1 className="m-4 text-2xl font-bold">הגדרות</h1>
            <TabsController defaultTab={currentTab} tabs={tabs}/>
            <div>{children}</div>
        </div>
    );
}
