import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchNews } from "../Redux/operations";
import formCSS from "./form.module.css";

export const SearchForm = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchNews(query));
    setQuery("");
  };

  return (
    <form className={formCSS.form} onSubmit={handleSubmit}>
      <input
        className={formCSS.input}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введіть запит для пошуку новин"
      />
      <button type="submit">Пошук</button>
    </form>
  );
};
