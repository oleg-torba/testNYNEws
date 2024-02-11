import { configureStore } from "@reduxjs/toolkit";
import { newsReducer } from "./newsSlice";
import { addNewsReducer } from "./addNewsSlice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    addNews: addNewsReducer,
  },
});
