"use client";
import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import SearchBar from "./SearchBar";
import { getEvents } from "@/services/events";
import { EventCardProps } from "./types";

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      console.log("Fetched events:", response);
      setEvents(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]); // Set an empty array if there's an error
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  // Set the page title dynamically
  useEffect(() => {
    document.title = loading
      ? "טוען אירועים..." // If loading, show "Loading Events..."
      : events.length > 0
      ? `אירועים (${events.length})` // Show total events in the title
      : "אין אירועים להצגה"; // Show "No events to display" if empty
  }, [loading, events]);

  useEffect(() => {
    fetchEvents(); // Fetch events when the component mounts
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
            />
            <div className="flex flex-wrap gap-6 items-start px-2.5 mt-5 max-w-full min-h-[428px] w-[731px]">
              {loading ? (
                <p>Loading events...</p>
              ) : events.length === 0 ? (
                <p>No events to display.</p>
              ) : (
                events.map((event, index) => (
                    <EventCard
                      key={index}
                      title={event.title}      // Name of the ad
                      date={event.date}        // Date of the ad
                      description={event.description}  // Description
                      buttonText={event.buttonText}    // Text for button
                      buttonIcon={event.buttonIcon}    // Icon for button
                      bookmarkIcon={event.bookmarkIcon} // Bookmark icon
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
