"use client";
import React, { useState } from "react";
import { TabButton } from "@/components/Loans/TabButton";
import { ActiveLoans } from "@/components/Loans/ActiveLoans";
import { HelpRequests } from "@/components/Loans/HelpRequests";
import { LoansHistory } from "@/components/Loans/LoansHistory";
const NeighborhoodLoansPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("activeLoans");
  const renderTabContent = () => {
    switch (activeTab) {
      case "helpRequests":
        return <HelpRequests />;
      case "activeLoans":
        return <ActiveLoans />;
      case "loansHistory":
        return <LoansHistory />;
      default:
        return null;
    }
  };
  return (
    <main className="flex flex-col pl-20 max-w-[862px] max-md:pl-5">
      <nav className="flex items-center self-start pr-4 text-sm font-medium leading-none text-neutral-700" role="tablist">
      <TabButton
          label="בקשות לעזרה"
          isActive={activeTab === "helpRequests"}
          onClick={() => setActiveTab("helpRequests")}
        />
        <TabButton
          label="השאלות פעילות"
          isActive={activeTab === "activeLoans"}
          onClick={() => setActiveTab("activeLoans")}
        />
        <TabButton
          label="היסטוריית השאלות"
          isActive={activeTab === "loansHistory"}
          onClick={() => setActiveTab("loansHistory")}
        />
      </nav>
      {renderTabContent()}
      
    </main>
  );
};

export default NeighborhoodLoansPage;
