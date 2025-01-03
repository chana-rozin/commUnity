import AdsPage from '@/components/Ads/AdsPage';
import EventsPage from '@/components/Events/EventsPage';
import { Navbar } from '@/components/Navbar/Navbar';

const HomePage = () => {
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
          {/* Welcome Banner */}
          <div className="flex overflow-hidden flex-wrap p-4 w-full bg-indigo-100 rounded-2xl min-h-[164px]">
            {/* Add banner content here */}
            <p className="text-neutral-950">Welcome to the community forum!</p>
          </div>

          {/* Posts Section */}
          <AdsPage />
        </div>

        

        {/* Left Column */}
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
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
            {/* Uncomment and replace with actual components when needed */}
            {/* <LoanItem 
              timeAgo="לפני שבוע"
              title="2 שקיות חלב"
              userType="השואל"
              userName="רותי אדל"
            /> */}
          </div>

          {/* Events Section */}
          <div className="flex flex-col p-5 mt-4 w-full bg-white rounded-2xl">
            {/* Uncomment and replace with actual components when needed */}
            {/* <EventCard 
              date="יח חשוון תשפ״ה, 19:45"
              title="אסיפת דיירים חזון איש 5"
              location="לובי הבניין, חזו״א 5"
              participants={7}
            /> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
