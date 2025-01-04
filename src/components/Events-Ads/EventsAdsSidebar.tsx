'use client';
import * as React from 'react';
import useUserStore from '@/stores/userStore';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface EventsAdsSidebarProps {
  categories: {
    name: string;
    href: string;
  }[];
}

export const EventsAdsSidebar: React.FC<EventsAdsSidebarProps> = ({ categories }) => {
  const { user } = useUserStore();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'events';

  if (!user) return null;

  const { first_name, last_name, address, profile_picture_url } = user;

  return (
    <main className="flex flex-col justify-center items-center w-full bg-white rounded-2xl py-10">
      <div className="flex flex-col text-center justify-center items-center mt-5 max-w-full w-[131px]">
        <img
          loading="lazy"
          src={profile_picture_url}
          alt={`Profile picture of ${first_name} ${last_name}`}
          className="object-contain aspect-square w-[67px] rounded-full object-cover"
        />
        <div className="flex flex-col justify-center items-center mt-3.5">
          <div className="text-base text-neutral-950">{`${first_name} ${last_name}`}</div>
          <div className="text-xs font-medium leading-none text-neutral-400">
            {`${address.street} ${address.houseNumber}`}
          </div>
        </div>
        <Link
          aria-label="View my profile"
          href="/settings/myProfile"
          className="gap-1 self-stretch px-4 py-2 mt-3.5 text-sm font-medium leading-none text-center text-white bg-indigo-600 rounded-md"
        >
          הפרופיל שלי
        </Link>
      </div>

      <nav className="flex text-center flex-col justify-between items-center mt-8 text-sm leading-none whitespace-nowrap bg-white min-h-[54px] gap-4">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={category.href}
            className={`${
              (category.href.includes('events') && currentTab === 'events') ||
              (category.href.includes('ads') && currentTab === 'ads')
                ? 'text-indigo-500'
                : 'text-gray-400'
            } hover:text-indigo-400 transition-colors`}
          >
            {category.name}
          </Link>
        ))}
      </nav>
    </main>
  );
};
