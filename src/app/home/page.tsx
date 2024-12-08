"use client"
import ForumPage from '../../components/Forum/ForumPage';
import { ProfileAside } from '@/components/ProfileAside/ProfileAside';
import {LoansNotificationsCard} from '@/components/LoansNotificationsCard/LoansNotificationsCard';
import { EventsNotificationsCard } from '@/components/EventsNotificationsCard/EventsNotificationsCard';
import useUserStore from '@/stores/userStore';
import { getSampleUser } from '@/utils/sampleUser';
import { useEffect } from 'react';

const HomePage = () => {

  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (!user) {
      (async () => {
        const sampleUser = await getSampleUser();
        setUser(sampleUser);
      })();
      console.log("Sample user set:", user);
    }
  }, []);

  console.log("User store:", user);

  return (
    <main>
      <div className="flex flex-wrap gap-4 items-start mt-5 w-full">
        {/* Right Column - Profile Section */}
        <aside className="flex flex-col min-h-[909px] w-[211px] max-w-full" role="complementary">
          <ProfileAside saved={false} />
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
          <ForumPage />
        </div>



        {/* Left Column */}
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[260px]">
          {/* Notifications Section */}
          <div className="flex gap-2 items-start w-full text-neutral-950">
            {/* Uncomment and replace with actual components when needed */}
            {/* <NotificationCard 
              count={5}
              title="התראות"
              subtitle=""
              timeText="ב5 הימים האחרונים"
              timeIcon="https://cdn.builder.io/api/v1/image/assets/TEMP/1bd7943f9cd8cf6430654cdea38cf0282c2f1e92e5dc28dacc089e37e7dae0ff?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
            />
            <NotificationCard 
              count={89}
              title="תגובות חדשות בדיונים ששמרת"
              subtitle=""
              timeText="בשבוע האחרון"
              timeIcon="https://cdn.builder.io/api/v1/image/assets/TEMP/1bd7943f9cd8cf6430654cdea38cf0282c2f1e92e5dc28dacc089e37e7dae0ff?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
            /> */}
          </div>

          {/* Loans Section */}
          <div className="flex flex-col p-5 mt-4 w-full bg-white rounded-2xl">
            <LoansNotificationsCard/>
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

export default HomePage;
