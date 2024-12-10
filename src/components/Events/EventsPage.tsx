"use client";
import React, { useState } from "react";
import EventCard from "./EventCard";
import SearchBar from "./SearchBar";
import useUserStore from "@/stores/userStore";

import { useEvents, useCreateEvent } from '@/services/mutations/events';

import { Event } from "@/types/event.type";
import Popup from "../PopUp/PopUp";

const EventsPage: React.FC = () => {
  // Get user from global store
  const { user } = useUserStore();
  
  // Fetch events using React Query
  const { data: events = [], isLoading, error } = useEvents();
  
  // Create event mutation
  const createEventMutation = useCreateEvent();

  // Local state for filtering and searching
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Popup state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  // New event state
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    name: "",
    description: "",
    date: new Date().toISOString(),
    location: "",
    createdDate: new Date().toDateString(),
    active: true,
    AuthorizedIds: []
  });

  // Search handler
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setFilteredEvents(
      events.filter((event) => 
        event.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  // Input change handler for new event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Special handling for date to convert to Date object
    const processedValue = name === 'date' 
    ? new Date(value).toISOString()  // Convert to ISO string
    : value;

    setNewEvent(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };
  // Submit new event handler
  const handlePopupSubmit = async () => {
    try {
      // Validate required fields
      if (!newEvent.name || !newEvent.description || !newEvent.date || !newEvent.location) {
        alert("Please fill in all fields");
        return;
      }
      debugger

      // Prepare event data for submission
      const eventToSubmit = {
        ...newEvent,
        date: new Date(newEvent.date).toISOString(), // Ensure date is ISO string
        createdDate: new Date().toISOString(),
        active: true,
        AuthorizedIds: []
      };

      // Use mutation to create event
      await createEventMutation.mutateAsync(eventToSubmit);
      
      // Reset form and close popup
      setNewEvent({
        name: "",
        description: "",
        date: new Date().toISOString(), // Reset to current date as ISO string
        location: "",
        createdDate: new Date().toISOString(),
        active: true,
        AuthorizedIds: []
      });
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to create event. Please try again.");
    }
  };

  // Determine events to display (filtered or all)
  const displayEvents = searchQuery ? filteredEvents : events;

  return (
    <main className="flex flex-col px-4 max-w-[791px]">
      {/* Search and Add Event Bar */}
      <div className="flex flex-wrap gap-6 items-start px-2.5 mt-5">
        <SearchBar
          searchIcon="/path/to/search-icon.svg"
          filterIcon="/path/to/filter-icon.svg"
          onSearch={handleSearchChange}
          onFilter={() => {}} 
        />
        {/* Add Event Button */}
        <button
          onClick={() => setIsPopupOpen(true)}
          className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600"
        >
          +
        </button>
      </div>

      {/* Event Cards */}
      <div className="flex flex-wrap gap-6 items-start px-2.5 mt-5">
        {isLoading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p>Error loading events: {error.message}</p>
        ) : displayEvents.length === 0 ? (
          <p>No events to display.</p>
        ) : (
          displayEvents.map((event) => (
            <EventCard key={event._id} {...event} />
          ))
        )}
      </div>

      {/* Popup for Adding Event */}
      <Popup
        title="Add New Event"
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handlePopupSubmit}
        items={[
          {
            type: "input",
            label: "Event Name",
            value: newEvent.name || "",
            onChange: (e) => {
              e.target.name = "name";
              handleInputChange(e);
            },
          },
          {
            type: "input",
            label: "Event Description",
            value: newEvent.description || "",
            onChange: (e) => {
              e.target.name = "description";
              handleInputChange(e);
            },
          },
          {
            type: "input",
            label: "Event Date",
            inputType: "date",
            value: newEvent.date
            ? new Date(newEvent.date).toISOString().split('T')[0] 
            : "",
            onChange: (e) => {
              e.target.name = "date";
              handleInputChange(e);
            },
          },
          {
            type: "input",
            label: "Event Location",
            value: newEvent.location || "",
            onChange: (e) => {
              e.target.name = "location";
              handleInputChange(e);
            },
          },
        ]}
      />
    </main>
  );
};

export default EventsPage;