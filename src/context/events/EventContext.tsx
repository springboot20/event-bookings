import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { EventContextInterface, EventContextProviderProps, EventInput } from "../../types/context";
import { EventBookingsApiReqeustHandler, LocalStorage } from "../../api/api";
import {
  createNewEvent,
  fetchEvents,
  fetchUserEvent,
  updateExistingEvent,
} from "../../configs/api.config";
import { EventInterface } from "../../types/events";
import { toast } from "react-toastify";

export const EventContext = createContext<EventContextInterface>({} as EventContextInterface);

export const EventContextProvider: React.FC<EventContextProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<EventInterface[]>(LocalStorage.get("events"));
  const [event, setEvent] = useState<EventInterface>(LocalStorage.get("event"));

  const createEvent = async (data: EventInput) => {
    await EventBookingsApiReqeustHandler(
      async () => await createNewEvent(data),
      setIsLoading,
      (response) => {
        const { data } = response;

        toast.success(data.message);

        return data;
      },
      toast.error,
    );
  };

  const fetchAllEvents = useCallback(async () => {
    await EventBookingsApiReqeustHandler(
      async () => await fetchEvents(),
      setIsLoading,
      (response) => {
        const { data } = response;

        setEvents(data.events);
        LocalStorage.set("events", data.events);

        toast.success(data.message);

        console.log(data);

        return data;
      },
      toast.error,
    );
  }, []);

  const fetchEvent = async (id: string) => {
    await EventBookingsApiReqeustHandler(
      async () => await fetchUserEvent(id),
      setIsLoading,
      (response) => {
        const { data } = response;

        setEvent(data.event);

        LocalStorage.set("event", data.event);

        toast.success(data.message);
        return data;
      },
      toast.error,
    );
  };

  const updateEvent = async (data: EventInput, id: string) => {
    await EventBookingsApiReqeustHandler(
      async () => await updateExistingEvent(data, id),
      setIsLoading,
      (response) => {
        const { data } = response;

        toast.success(data.message);

        return data;
      },
      toast.error,
    );
  };

  useEffect(() => {
    let didCancle = false;

    if (!didCancle) {
      fetchAllEvents();
    }

    return () => {
      didCancle = true;
    };
  }, []);

  const value = useMemo(
    () => ({ isLoading, event, createEvent, events, updateEvent, fetchEvent }),
    [],
  );

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};
