"use client";
import React, { useState } from "react";
import AdCard from "./AdCard";
import SearchBar from "./SearchBar";
import useUserStore from "@/stores/userStore";

import { useAds, useCreateAd } from '@/services/mutations/ads';

import { Ad } from "@/types/ad.type";
import Popup from "../PopUp/PopUp";
import { EmptyState } from '@/components/Events-Ads/emptyPage';

const AdsPage: React.FC = () => {
  // Get user from global store
  const { user } = useUserStore();
  
  // Fetch ads using React Query
  const { data: ads = [], isLoading, error } = useAds();
  
  if (ads.length === 0) {
    return <EmptyState type="ads" />;
  }
  // Create ad mutation
  const createAdMutation = useCreateAd();

  // Local state for filtering and searching
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Popup state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  // New ad state
  const [newAd, setNewAd] = useState<Partial<Ad>>({
    name: "",
    description: "",
    createdDate: new Date().toDateString(),
    expirationDate: new Date().toDateString(),
    AuthorizedIds: []
  });

  // Search handler
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setFilteredAds(
      ads.filter((ad) => 
        ad.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  // Input change handler for new ad
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Special handling for date to convert to Date object
    const processedValue = name === 'date' 
    ? new Date(value).toISOString()  // Convert to ISO string
    : value;

    setNewAd(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  // Submit new ad handler
  const handlePopupSubmit = async () => {
    try {
      // Validate required fields
      if (!newAd.name || !newAd.description || !newAd.createdDate || !newAd.expirationDate) {
        alert("Please fill in all fields");
        return;
      }

      // Prepare ad data for submission
      const adToSubmit = {
        ...newAd,
        createdDate: new Date().toISOString(),
        expirationDate: new Date().toDateString(),
        AuthorizedIds: []
      };

      // Use mutation to create ad
      await createAdMutation.mutateAsync(adToSubmit);
      
      // Reset form and close popup
      setNewAd({
        name: "",
        description: "",
        createdDate: new Date().toISOString(),
        expirationDate: new Date().toDateString(),
        AuthorizedIds: []
      });
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error adding an ad:", error);
      alert("Failed to create an ad. Please try again.");
    }
  };

  return (
    <main className="flex flex-col items-center px-4 w-full">
      {/* Search and Add Ad Bar */}
      <div className="w-full max-w-[791px] px-2.5 mt-5">
        <SearchBar
          searchIcon="/path/to/search-icon.svg"
          onSearch={handleSearchChange}
          onAddAd={() => setIsPopupOpen(true)}
        />
      </div>

      {/* Ads Cards */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-[791px] px-2.5 mt-5">
        {isLoading ? (
          <p>Loading ads...</p>
        ) : error ? (
          <p>Error loading ads: {error.message}</p>
        ) : searchQuery ? (
          filteredAds.map((ad) => (
            <AdCard key={ad._id} {...ad} />
          ))
        ) : (
          ads.map((ad) => (
            <AdCard key={ad._id} {...ad} />
          ))
        )}
      </div>

      {/* Popup for Adding Ad */}
      <Popup
        title="Add New Ad"
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handlePopupSubmit}
        items={[
          {
            type: "input",
            label: "Ad Name",
            value: newAd.name || "",
            onChange: (e) => {
              e.target.name = "name";
              handleInputChange(e);
            },
          },
          {
            type: "input",
            label: "Ad Description",
            value: newAd.description || "",
            onChange: (e) => {
              e.target.name = "description";
              handleInputChange(e);
            },
          },
          {
            type: "input",
            label: "Ad createdDate",
            value: new Date().toDateString(),
            onChange: (e) => {
              e.target.name = "createdDate";
              handleInputChange(e);
            },
          },
          {
            type: "input",
            label: "Ad expirationDate",
            value: newAd.expirationDate || "",
            onChange: (e) => {
              e.target.name = "expirationDate";
              handleInputChange(e);
            },
          },
        ]}
      />
    </main>
  );
};

export default AdsPage;