import { createSlice } from "@reduxjs/toolkit";
import { createNews } from "./operations";
const addNewsSlice = createSlice({
  name: "news",
  initialState: {
    newsList: [],
    loading: false,
    error: null,
  },
  reducers: {
    addNews(state, action) {
      state.newsList.push(action.payload);
    },
    deleteNews: (state, action) => {
      state.newsList = state.newsList.filter(
        (news) => news.title !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.news.push(action.payload);
      })
      .addCase(createNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addNews, deleteNews } = addNewsSlice.actions;
export const addNewsReducer = addNewsSlice.reducer;
