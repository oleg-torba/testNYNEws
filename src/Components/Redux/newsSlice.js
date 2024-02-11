import { createSlice } from "@reduxjs/toolkit";
import { fetchNews } from "./operations";

const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    status: "idle",
    error: null,
    displayedNewsCount: 10,
  },
  reducers: {
    setDisplayedNewsCount(state, action) {
      state.displayedNewsCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = [{ ...action.payload, liked: false }];
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setDisplayedNewsCount } = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
