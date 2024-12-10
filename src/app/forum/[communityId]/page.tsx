'use client';
import React from 'react';
import ForumPage from '@/components/Forum/ForumPage';
import { ProfileAside } from '@/components/ProfileAside/ProfileAside';
import { LoansNotificationsCard } from '@/components/LoansNotificationsCard/LoansNotificationsCard';
import { EventsNotificationsCard } from '@/components/EventsNotificationsCard/EventsNotificationsCard';
import { useParams } from 'next/navigation';
import useUserStore from '@/stores/userStore';

const CommunityForumPage: React.FC = () => {
  const { communityId } = useParams();
  const { user, setUser } = useUserStore();

  const categories = [{ name: "ראשי", href: "/home", isActive: user?.neighborhoodId==communityId }, { name: "שמורים", href: "/saved", isActive: false }]

  return (
    <main>
      <div className="flex flex-wrap gap-4 items-start mt-5 w-full">
        {/* Right Column - Profile Section */}
        <aside className="flex flex-col min-h-[909px] w-[211px] max-w-full" role="complementary">
          <ProfileAside categories={categories} />
        </aside>

        {/* Middle Column */}
        <div className="flex flex-col min-w-[240px] w-[775px]">
          <div className="relative flex items-center justify-between overflow-hidden mb-2 flex-wrap p-6 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl min-h-[164px] shadow-lg">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none z-0"></div>

            {/* Text Content */}
            <div className="flex flex-col z-10">
              <h2 className="text-2xl font-bold">
                היי {user?.first_name}!
              </h2>
              <p className="mt-2 text-base font-medium">
                יש לנו כמה הפתעות בשבילך 🎉
              </p>
            </div>

            {/* Right Side: Illustration/Icon */}
            <div className="flex items-center justify-center z-10">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-10 h-10 text-white"
                >
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm1-13h-2v6h2zm0 8h-2v2h2z" />
                </svg>
              </div>
            </div>
          </div>
          {/* Posts Section */}
          <ForumPage selectedCommunityId={communityId as string} />
        </div>
        {/* Left Column */}
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[260px]">
          {/* Loans Section */}
          <div className="flex flex-col p-5  w-full bg-white rounded-2xl">
            <LoansNotificationsCard />
          </div>
          {/* Events Section */}
          <div className="flex flex-col p-5 mt-4 w-full bg-white rounded-2xl">
            <EventsNotificationsCard />
          </div>
        </div>
      </div>
    </main>
  );


};

export default CommunityForumPage;
