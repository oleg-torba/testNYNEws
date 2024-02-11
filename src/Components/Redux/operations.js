import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNews = createAsyncThunk(
  "/news",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&from=2024-01-11&sortBy=publishedAt&apiKey=316de05515a34f4ba2717e9ac9cedfd6`
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const LOAD_MORE_NEWS_REQUEST = "LOAD_MORE_NEWS_REQUEST";
export const LOAD_MORE_NEWS_SUCCESS = "LOAD_MORE_NEWS_SUCCESS";
export const LOAD_MORE_NEWS_FAILURE = "LOAD_MORE_NEWS_FAILURE";

export const loadMoreNewsRequest = () => ({
  type: LOAD_MORE_NEWS_REQUEST,
});

export const loadMoreNewsSuccess = (news) => ({
  type: LOAD_MORE_NEWS_SUCCESS,
  payload: news,
});

export const loadMoreNewsFailure = (error) => ({
  type: LOAD_MORE_NEWS_FAILURE,
  payload: error,
});

export const loadMoreNews = (page) => {
  return async (dispatch) => {
    dispatch(loadMoreNewsRequest());
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?page=${page}&apiKey=YOUR_API_KEY`
      );
      const data = await response.json();
      dispatch(loadMoreNewsSuccess(data.articles));
    } catch (error) {
      dispatch(loadMoreNewsFailure(error.message));
    }
  };
};

export const createNews = createAsyncThunk(
  "news/",
  async (newsData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/news", newsData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
