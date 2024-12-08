"use client";
import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import SearchBar from "./SearchBar";
import { getEvents } from "@/services/events";
import { Event } from "@/types/event.type";

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      const fetchedEvents = Array.isArray(response.data) ? response.data : [];
      setEvents(fetchedEvents);
      setFilteredEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
      setFilteredEvents([]);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Match the event name exactly as the query (case-sensitive)
    setFilteredEvents(
      events.filter((event) =>
        event.name.includes(query) // Exact order match
      )
    );
  };

  const handleFilterClick = () => {
    console.log("Filter button clicked");
    // You can add a filter logic here
  };

  return (
    <main className="flex flex-col px-4 max-w-[791px]">
      {/* Bar with Search and Filter Button */}
      <div className="flex flex-wrap gap-6 items-start px-2.5 mt-5">
        <SearchBar
          searchIcon="/path/to/search-icon.svg" // Replace with your actual search icon path
          filterIcon="/path/to/filter-icon.svg" // Replace with your actual filter icon path
          onSearch={handleSearchChange}
          onFilter={handleFilterClick}
        />
      </div>

      {/* Event Cards */}
      <div className="flex flex-wrap gap-6 items-start px-2.5 mt-5">
        {loading ? (
          <p>Loading events...</p>
        ) : filteredEvents.length === 0 ? (
          <p>No events to display.</p>
        ) : (
          filteredEvents.map((event, index) => (
            <EventCard key={index} {...event} />
          ))
      )}
      </div>
    </main>
  );
};

export default EventsPage;
