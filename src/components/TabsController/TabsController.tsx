import React, { useState } from 'react'
import Link from 'next/link'

interface TabsControllerProps{
    defaultTab: string,
    tabs: { text: string, href: string }[]
}

function TabsController(props: TabsControllerProps) {
    const { defaultTab, tabs } = props;
    const [currentTab, setCurrentTab] = useState(defaultTab);

    const selectedTabStyle = "text-indigo-600 bg-violet-50 shadow-sm border-b-[3px] border-solid border-b-indigo-600 font-semibold";

    return (
        <nav className="flex items-center self-start pr-4 text-sm font-medium leading-none text-neutral-700" role="tablist">
            {tabs.map((tab, index) =><Link
            key={index}
            href={tab.href}
            className={`p-3 ${currentTab==tab.text?selectedTabStyle:"text-neutral-700"}`}
            onClick={() => setCurrentTab(tab.text)}>
                {tab.text}</Link>)}
        </nav>
    )
}

export default TabsController