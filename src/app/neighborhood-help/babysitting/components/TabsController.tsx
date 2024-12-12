import React, { useState } from 'react'
import Link from 'next/link'

interface TabsControllerProps{
    defaultTab: string,
    tabs: { text: string, href: string }[]
}

function TabsController(props: TabsControllerProps) {
    const { defaultTab, tabs } = props;
    const [currentTab, setCurrentTab] = useState(defaultTab);

    const selectedTabStyle = "text-indigo-800 border-b-[3px] border-solid border-b-indigo-800 font-semibold";

    return (
        <nav className="flex flex-start mr-4 gap-4 items-center " role="navigation">
            {tabs.map((tab, index) =><Link
            key={index}
            href={tab.href}
            className={`px-4 pb-1 cursor-pointer ${currentTab==tab.text?selectedTabStyle:""}`}
            onClick={() => setCurrentTab(tab.text)}>
                {tab.text}</Link>)}
        </nav>
    )
}

export default TabsController