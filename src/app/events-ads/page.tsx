'use client';
import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AdsPage from '@/components/Ads/AdsPage';
import EventsPage from '@/components/Events/EventsPage';

const EventsAdsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get('tab') || 'events';

  useEffect(() => {
    if (!searchParams.get('tab')) {
      router.push('/events-ads?tab=events');
    }
  }, [searchParams, router]);

  const renderContent = () => {
    switch (activeTab) {
      case 'events':
        return <EventsPage />;
      case 'ads':
        return <AdsPage />;
      default:
        return <EventsPage />;
    }
  };

  return (
    <div className="flex flex-col mt-4 min-w-[240px] w-[775px] max-md:max-w-full">
      {renderContent()}
    </div>
  );
};

export default EventsAdsPage;
