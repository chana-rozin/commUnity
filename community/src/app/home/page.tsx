import ForumPage from './forum/ForumPage';
import { Navbar } from '@/components/Navbar/Navbar';
import { ProfileAside } from '@/components/ProfileSideBar/ProfileAside'

const HomePage = () => {

const navItems = [
        { isActive: true, icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/24acf9bf6b6d6b7b96d2a34130f075c7cb5b6d35335de6e5f985ebc2d6a2c515?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611", text: "הבניין שלי" },
        { isActive: false, icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/24acf9bf6b6d6b7b96d2a34130f075c7cb5b6d35335de6e5f985ebc2d6a2c515?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611", text: "בית הכנסת שלי" },
        { isActive: false, icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/24acf9bf6b6d6b7b96d2a34130f075c7cb5b6d35335de6e5f985ebc2d6a2c515?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611", text: "הקהילה שלי" },
        { isActive: false, icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/24acf9bf6b6d6b7b96d2a34130f075c7cb5b6d35335de6e5f985ebc2d6a2c515?placeholderIfAbsent=true&apiKey=526d563cdba2451a913eb25ca7c41611", text: "חברות שלי" }
    ];

  return (
    <main>
      <div className="flex flex-wrap gap-4 items-start mt-5 w-full">
        {/* Right Column - Profile Section */}
        <aside
          className="flex flex-col h-[909px] w-[211px] max-w-full"
          role="complementary"
        >
          {/* Add profile content here */}
          <ProfileAside navItems={navItems} saved={false}/>
          {/* <div className="flex flex-col items-center p-5 bg-white rounded-2xl">
            <p className="text-neutral-950">Profile Section</p>
          </div> */}
        </aside>

        {/* Middle Column */}
        <div className="flex flex-col min-w-[240px] w-[775px]">
          {/* Welcome Banner */}
          <div className="flex overflow-hidden mb-4 flex-wrap p-4 w-full bg-indigo-100 rounded-2xl min-h-[164px]">
            {/* Add banner content here */}
            <p className="text-neutral-950">הי טלי! <br/> בואי נראה מה חדש פה..</p>
          </div>

          {/* Posts Section */}
          <ForumPage />
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
