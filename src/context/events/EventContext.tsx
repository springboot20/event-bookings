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

export const EventContext = createContext<EventContextInterface>({} as EventContextInterface);

export const EventContextProvider: React.FC<EventContextProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [event, setEvent] = useState<EventInterface>({} as EventInterface);

  const createEvent = async (data: EventInput) => {
    await EventBookingsApiReqeustHandler({
      api: async () => await createNewEvent(data),
      setLoading: setIsLoading,
      onSuccess(response, message, toast) {
        const { data } = response;

        toast(message);

        return data;
      },
      onError(error, toast) {
        toast(error);
      },
    });
  };

  const fetchAllEvents = useCallback(async () => {
    await EventBookingsApiReqeustHandler({
      api: async () => await fetchEvents(),
      setLoading: setIsLoading,
      onSuccess(response, message, toast) {
        const { data } = response;

        setEvents(data.events);
        LocalStorage.set("events", data.events);

        toast(message);


        console.log(data)

        return data;
      },
      onError(error, toast) {
        toast(error);
      },
    });
  }, []);

  const fetchEvent = async (id: string) => {
    await EventBookingsApiReqeustHandler({
      api: async () => await fetchUserEvent(id),
      setLoading: setIsLoading,
      onSuccess(response, message, toast) {
        const { data } = response;

        setEvent(data.event);

        LocalStorage.set("event", data.event);

        toast(message);
        return data;
      },
      onError(error, toast) {
        toast(error);
      },
    });
  };

  const updateEvent = async (data: EventInput, id: string) => {
    await EventBookingsApiReqeustHandler({
      api: async () => await updateExistingEvent(data, id),
      setLoading: setIsLoading,
      onSuccess(response, message, toast) {
        const { data } = response;
        toast(message);

        return data;
      },
      onError(error, toast) {
        toast(error);
      },
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const event = LocalStorage.get("event");
    const events = LocalStorage.get("events");

    if (event && events) {
      setEvent(event);
      setEvents(events);
    }

    fetchAllEvents();
    setIsLoading(false);
  }, []);

  console.log(isLoading);
  const value = useMemo(
    () => ({ isLoading, event, createEvent, events, updateEvent, fetchEvent }),
    [],
  );

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};
