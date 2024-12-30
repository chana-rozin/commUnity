"use client";
import React, { useState } from "react";
import EventCard from "./EventCard";
import SearchBar from "./SearchBar";
import useUserStore from "@/stores/userStore";
import { useEvents, useCreateEvent } from '@/services/mutations/events';
import { Event } from "@/types/event.type";
import { z } from "zod";
import { AddForm } from "../Forms/AddForm";
import { useUserCommunities } from '@/services/mutations/communities';
import { CommunitySelect } from '../Forms/CommunitySelect';
import Loading from '@/components/animations/Loading'

const eventSchema = z.object({
  name: z.string().min(1, "יש להזין שם אירוע"),
  description: z.string().min(1, "יש להזין תיאור"),
  date: z.date(),
  location: z.string().min(1, "יש להזין מיקום"),
  createdDate: z.date(),
  active: z.boolean(),
  AuthorizedIds: z.array(z.string()),
});

const EventsPage: React.FC = () => {
  const { user } = useUserStore();
  const { data: events = [], isLoading, error } = useEvents();
  const { 
    data: userCommunities = [], 
    isLoading: communitiesLoading,
    error: communitiesError 
  } = useUserCommunities(user?._id);
  const createEventMutation = useCreateEvent();

  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setFilteredEvents(
      events.filter((event) =>
        event.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleCreateEvent = (data: Partial<Event>) => {
    const eventData: Partial<Event> = {
      ...data,
      AuthorizedIds: selectedCommunities.length > 0 
        ? selectedCommunities 
        : (user?.neighborhood?._id ? [user.neighborhood._id] : []),
      authorizedType: 'community' as const  // This ensures the correct type
    };
    createEventMutation.mutate(eventData);
    setIsAddFormOpen(false);
    setSelectedCommunities([]);
};
  console.log('User Communities:', userCommunities);

  if (isLoading) return <Loading height={'low'}/>;
  if (error) return <p className="text-red-500">Error loading events: {error.message}</p>;

  return (
    <main className="flex flex-col items-center px-4 w-full">
      {/* Search and Add Event Bar */}
      <div className="w-full max-w-[791px] px-2.5 mt-5">
        <SearchBar
          searchIcon="/path/to/search-icon.svg"
          onSearch={handleSearchChange}
          onAddEvent={() => setIsAddFormOpen(true)}
        />
      </div>

      {/* AddForm */}
      {isAddFormOpen && (
    <AddForm
      schema={eventSchema}
      initialValues={{}}
      hiddenFields={{
        createdDate: new Date(),
        active: true,
        AuthorizedIds: [],
      }}
      onSubmit={handleCreateEvent}
      title="הוספת אירוע חדש"
      isOpen={true}
      onClose={() => setIsAddFormOpen(false)}
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          שתף עם קהילות
        </label>
        <CommunitySelect
          communities={userCommunities}
          selectedCommunities={selectedCommunities}
          onChange={setSelectedCommunities}
          isLoading={communitiesLoading}
        />
        {communitiesError && (
          <p className="text-red-500 text-sm mt-1">
            Error loading communities. Please try again.
          </p>
        )}
      </div>
    </AddForm>
  )}

      {/* Event Cards */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-[791px] px-2.5 mt-5">
        {(searchQuery ? filteredEvents : events).map((event) => (
          <EventCard key={event._id} {...event} />
        ))}
      </div>
    </main>
  );
};

export default EventsPage;