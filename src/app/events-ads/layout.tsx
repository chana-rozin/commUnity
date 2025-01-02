'use client';
import React from 'react';
import { EventsAdsSidebar } from '@/components/Events-Ads/EventsAdsSidebar';

export default function EventsAdsLayout({ children }: { children: React.ReactNode }) {
  const categories = [
    { name: "אירועים", href: "/events-ads?tab=events" },
    { name: "מודעות", href: "/events-ads?tab=ads" },
  ];

  return (
    <div className="flex flex-wrap gap-4 items-start mt-5 w-full">
      <aside className="flex flex-col w-[211px] max-w-full" role="complementary">
        <EventsAdsSidebar categories={categories} />
      </aside>
      {children}
    </div>
  );
}