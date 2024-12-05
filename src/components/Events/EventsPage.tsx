"use client";
import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import SearchBar from "./SearchBar";
import { getEvents } from "@/services/events";
import { Event } from "@/types/event.type";

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      const fetchedEvents = Array.isArray(response.data) ? response.data : [];
      setEvents(fetchedEvents);
      setFilteredEvents(fetchedEvents); // Initialize filtered events
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
      setFilteredEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(lowercasedQuery) ||
      event.location.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredEvents(filtered);
  };

  const handleFilter = () => {
    console.log("Filter action triggered");
    // Add filter functionality here (e.g., show a modal or dropdown)
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <main className="flex flex-col px-4 max-w-[791px]">
      <div className="flex flex-col items-end w-full bg-violet-50 min-h-[886px] max-md:max-w-full">
        <nav className="flex items-center pr-4 text-sm font-medium leading-none whitespace-nowrap text-neutral-700">
          <button className="self-stretch p-2 my-auto">מודעות</button>
          <button className="self-stretch p-2 my-auto bg-violet-50 shadow-sm text-violet-950">
            אירועים
          </button>
          <button className="self-stretch p-2 my-auto">שמורים</button>
        </nav>
        <section className="flex flex-col justify-center items-end py-4 pr-4 w-full bg-indigo-100 rounded-2xl">
          <div className="flex flex-col items-end w-full max-w-[775px] max-md:max-w-full">
            <SearchBar
              searchIcon="https://cdn.builder.io/api/v1/image/assets/TEMP/b9591596270d6b187f64a7a1612ff1f48bb7b06db896c63e1f4f62c8de0f707c?placeholderIfAbsent=true&apiKey=74b2142c0bce4595b7b12dcbcfab8364"
              filterIcon="https://cdn.builder.io/api/v1/image/assets/TEMP/de030c42bb66754d21cdc4c95a880e99a4a4894f72c431a4fecfb47dce304ab3?placeholderIfAbsent=true&apiKey=74b2142c0bce4595b7b12dcbcfab8364"
              onSearch={handleSearch}
              onFilter={handleFilter}
            />
            <div className="flex flex-wrap gap-6 items-start px-2.5 mt-5 max-w-full min-h-[428px] w-[731px]">
              {loading ? (
                <p>Loading events...</p>
              ) : filteredEvents.length === 0 ? (
                <p>No events to display.</p>
              ) : (
                filteredEvents.map((event, index) => (
                  <EventCard
                    key={index}
                    name={event.name}
                    location={event.location}
                    date={event.date}
                    locationIcon="/icons/location-icon.svg" // Replace with actual path
                    timeIcon="/icons/time-icon.svg" // Replace with actual path
                  />
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default EventsPage;
