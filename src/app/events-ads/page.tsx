'use client';
import React, { useState } from 'react';
import { TabButton } from '@/components/Events-Ads/TabButton';
import AdsPage from '@/components/Ads/AdsPage';
import EventsPage from '@/components/Events/EventsPage';

const EventsAdsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("events");

  const renderTabContent = () => {
    switch (activeTab) {
      case "events":
        return <EventsPage />;
      case "ads":
        return <AdsPage />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col mt-4 min-w-[240px] w-[775px] max-md:max-w-full">
      <nav className="flex items-center self-start pr-4 text-sm font-medium leading-none text-neutral-700" role="tablist">
        <TabButton
          label="אירועים"
          isActive={activeTab === "events"}
          onClick={() => setActiveTab("events")}
        />
        <TabButton
          label="מודעות"
          isActive={activeTab === "ads"}
          onClick={() => setActiveTab("ads")}
        />
      </nav>
      
      {renderTabContent()}
    </div>
  );
};

export default EventsAdsPage;