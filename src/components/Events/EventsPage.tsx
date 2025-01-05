"use client";
import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import SearchBar from "./SearchBar";
import useUserStore from "@/stores/userStore";
import { useEvents, useCreateEvent } from '@/services/mutations/events';
import { Event } from "@/types/event.type";
import { z } from "zod";
import { AddForm } from "../Forms/AddForm";
import Loading from '@/components/animations/Loading';
import { useCommunities } from '@/services/mutations/communities';
import { CommunitySelect } from '../Forms/CommunitySelect';
import { EmptyState } from '@/components/Events-Ads/emptyPage';

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
  const { data: events = [], isLoading: eventsLoading, error: eventsError } = useEvents();
  const { data: communities = [], isLoading: communitiesLoading, error: communitiesError } = useCommunities(user?._id || '');
  const createEventMutation = useCreateEvent();

  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);

  useEffect(() => {
    if (searchQuery && events) {
      setFilteredEvents(
        events.filter((event) => 
          event.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, events]);

  if (eventsLoading || communitiesLoading) {
    return <Loading height={'low'}/>;
  }

  if (eventsError || communitiesError) {
    return (
      <p className="text-red-500">
        Error loading content: {eventsError?.message || communitiesError?.message}
      </p>
    );
  }

  if (!events || events.length === 0) {
    return <EmptyState type="events" />;
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreateEvent = async (data: Partial<z.infer<typeof eventSchema>>) => {
    const eventData = {
      ...data,
      AuthorizedIds: selectedCommunities.length > 0 
        ? selectedCommunities 
        : (user?.neighborhood?._id ? [user.neighborhood._id] : []),
      authorizedType: 'community' as const
    };

    try {
      await createEventMutation.mutateAsync(eventData);
      setIsAddFormOpen(false);
      setSelectedCommunities([]);
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 w-full">
      <div className="w-full max-w-[791px] px-2.5 mt-5">
        <SearchBar
          searchIcon="/path/to/search-icon.svg"
          onSearch={handleSearchChange}
          onAddEvent={() => setIsAddFormOpen(true)}
        />
      </div>

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
          onClose={() => {
            setIsAddFormOpen(false);
            setSelectedCommunities([]);
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              שתף עם קהילות
            </label>
            <CommunitySelect
              communities={communities}
              selectedCommunities={selectedCommunities}
              onChange={setSelectedCommunities}
              isLoading={communitiesLoading}
            />
            {communitiesError && (
              <p className="text-red-500 text-sm mt-1">
                שגיאה בטעינת הקהילות. אנא נסה שוב.
              </p>
            )}
          </div>
        </AddForm>
      )}

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-[791px] px-2.5 mt-5">
        {(searchQuery ? filteredEvents : events).map((event) => (
          <EventCard key={event._id} {...event} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;