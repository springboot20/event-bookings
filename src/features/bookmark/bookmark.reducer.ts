import { createSlice } from "@reduxjs/toolkit";
import { LocalStorage } from "../../app/util";
import { BookmarkSlice } from "./bookmark.slice";
import { BookmarkInterface } from "../../types/bookmark";

const initialState = {
  bookmark: LocalStorage.get("bookmark") as BookmarkInterface,
  isNewItemAddedToBookmark: false,
};

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      BookmarkSlice.endpoints.userBookmark.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;

        state.bookmark = data.bookmark;

        LocalStorage.set("bookmark", data.bookmark);
      }
    );

    builder.addMatcher(
      BookmarkSlice.endpoints.addEventToBookmark.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;

        state.bookmark = data.bookmark;
        state.isNewItemAddedToBookmark = true;

        LocalStorage.set("bookmark", data.bookmark);
      }
    );
  },
});

export const bookmarkReducer = bookmarkSlice.reducer;
