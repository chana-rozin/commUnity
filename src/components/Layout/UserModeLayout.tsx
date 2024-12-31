import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import { EventsNotificationsCard } from '@/components/EventsNotificationsCard/EventsNotificationsCard';
import GeneralNotificationsCard from '@/components/GeneralNotificationsCard/GeneralNotificationsCard';
import { LoansNotificationsCard } from '@/components/LoansNotificationsCard/LoansNotificationsCard';

interface LayoutProps {
    children: React.ReactNode;
}

const UserModeLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="grid grid-cols-[4fr_1fr] gap-4">
                {/* Main Content - 80% */}
                <div className="col-span-1">
                    {children}
                </div>
                {/* Sidebar - 20% */}
                <div className="flex flex-col flex-1 shrink basis-0 min-w-[260px] gap-3 mt-5">
                    <div className="flex flex-col p-5 w-full bg-white rounded-2xl">
                        <GeneralNotificationsCard />
                    </div>
                    <div className="flex flex-col p-5 w-full bg-white rounded-2xl">
                        <EventsNotificationsCard />
                    </div>
                    <div className="flex flex-col p-5  w-full bg-white rounded-2xl">
                        <LoansNotificationsCard />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserModeLayout;
