import React from 'react'
import Minyans from './minyans'

function page() {
    return (
        <main className="flex overflow-hidden flex-col px-12 pt-6 pb-60 bg-violet-50 max-md:px-5 max-md:pb-24">
            <div className="flex flex-wrap gap-4 items-start mt-5 w-full">
                {/* Right Column - Profile Section */}
                <aside
                    className="flex flex-col h-[909px] w-[211px] max-w-full"
                    role="complementary"
                >
                    {/* Add profile content here */}
                    <div className="flex flex-col items-center p-5 bg-white rounded-2xl">
                        <p className="text-neutral-950">Profile Section</p>
                    </div>
                </aside>
                {/* Middle Column */}
                <div className="flex flex-col min-w-[240px] w-[775px]">
                    <Minyans />
                </div>
                {/* Left Column */}
                <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
                    <div className="flex gap-2 items-start w-full text-neutral-950">
                    </div>
                    <div className="flex flex-col p-5 mt-4 w-full bg-white rounded-2xl">
                    </div>
                    <div className="flex flex-col p-5 mt-4 w-full bg-white rounded-2xl">
                    </div>
                </div>
            </div>
        </main>
    )
}

export default page
