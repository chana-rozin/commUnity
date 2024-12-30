import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEvents, saveEvent, unSaveEvent, getEventsByCommunityId } from '@/services/events'; 
import { Event } from '@/types/event.type';
import { User } from '@/types/user.type';
import http from '../http';
import { getCommunities } from '@/services/communities';
import { Community } from '@/types/community.type';

export const useEvents = () => {
  return useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await getEvents();
      return Array.isArray(response.data) ? response.data : [];
    },
    retry: 1,
  });
};

export const useUserCommunities = (userId: string | undefined) => {
  return useQuery<Community[]>({
    queryKey: ['userCommunities', userId],
    queryFn: () => getCommunities(userId as string),
    enabled: !!userId,
  });
};

export const useEventsByCommunityId = (communityId: string) => {
  return useQuery<Event[]>({
    queryKey: ['events', communityId], 
    queryFn: () => getEventsByCommunityId(communityId), 
    retry: 1,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<Event, Error, Partial<Event>>({
    mutationFn: async (eventData) => {
      debugger
      const response = await http.post('/events', eventData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error) => {
      console.error('Failed to create an event:', error);
    },
  });
};

interface SaveEventContext {
  previousEvents?: Event[];
  previousSavedEvents?: string[];
}

export const useSaveEvent = (user: User | null, setUser: (user: User) => void) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { eventId: string }, SaveEventContext>({
    mutationFn: async ({ eventId }) => {
      const isCurrentlySaved = user?.savedEventsIds.includes(eventId);

      return isCurrentlySaved
        ? await saveEvent(user!._id || "", eventId)
        : await unSaveEvent(user!._id || "", eventId);
    },
    onMutate: async ({ eventId }) => {
      await queryClient.cancelQueries({ queryKey: ['events'] });
      const previousEvents = queryClient.getQueryData<Event[]>(['events']);
      const previousSavedEvents = user?.savedEventsIds || [];

      const updatedSavedEvents = previousSavedEvents.includes(eventId)
        ? previousSavedEvents.filter(id => id !== eventId)
        : [...previousSavedEvents, eventId];

      if (user) {
        setUser({
          ...user,
          savedEventsIds: updatedSavedEvents
        });
      }

      queryClient.setQueryData(['events'], (oldEvents: Event[] | undefined) =>
        oldEvents?.map(event =>
          event._id === eventId
            ? { ...event, saved: !previousSavedEvents.includes(eventId) }
            : event
        ) || []
      );

      return { previousEvents, previousSavedEvents };
    },
    onError: (err, variables, context) => {
      if (context?.previousSavedEvents && user) {
        setUser({
          ...user,
          savedEventsIds: context.previousSavedEvents
        });
      }

      if (context?.previousEvents) {
        queryClient.setQueryData(['events'], context.previousEvents);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    }
  });
};
