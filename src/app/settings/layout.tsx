// app/settings/layout.tsx
"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [currentTab, setCurrentTab] = useState(pathname.split("/").filter(Boolean).pop());

    const selectedTabStyle =
        "text-indigo-800 border-b-4 border-solid border-b-indigo-800 font-semibold";

    const handleTabToggle = (value: string) => {
        router.push(`/settings/${value}`);
        setCurrentTab(value);
    };

    return (
        <div className="mt-4">
            <h1 className="m-4 text-2xl font-bold">הגדרות</h1>
            {/* Tabs */}
            <div className="flex gap-4 mr-4">
                <div
                    onClick={() => handleTabToggle("preferences")}
                    className={`px-4 pb-1 ${currentTab === "preferences" ? selectedTabStyle : ""}`}
                >
                    כללי
                </div>
                <div
                    onClick={() => handleTabToggle("myProfile")}
                    className={`px-4 pb-1 ${currentTab === "myProfile" ? selectedTabStyle : ""}`}
                >
                    הפרופיל שלי
                </div>
            </div>

            {/* Nested Route Content */}
            <div>{children}</div>
        </div>
    );
}
