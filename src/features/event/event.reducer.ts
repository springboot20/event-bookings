import { createSlice } from "@reduxjs/toolkit";
import { LocalStorage } from "../../util";
import { EventInterface } from "../../types/events";
import { EventApiSlice } from "./event.slice";

const initialState = {
  events: LocalStorage.get("events") as EventInterface[],
  event: LocalStorage.get("event") as EventInterface,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      EventApiSlice.endpoints.getAllEvents.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;

        state.events = data.events;

        LocalStorage.set("events", data.events);
      },
    );

    builder.addMatcher(
      EventApiSlice.endpoints.getEventById.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;

        state.event = data.event;

        LocalStorage.set("event", data.event);
      },
    );
  },
});
