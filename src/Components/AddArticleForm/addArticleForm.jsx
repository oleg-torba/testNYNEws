import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNews } from "../Redux/addNewsSlice";
import articleFormCSS from "./articleForm.module.css";
export const AddArticleForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addNews({
        image,
        author,
        description,
        title,
      })
    );
    setImage("");
    setAuthor("");
    setDescription("");
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className={articleFormCSS.form}>
      <div>
        <label>Зображення:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div>
        <label>Автор:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Опис:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Заголовок:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className={articleFormCSS.buttons}>
        <button type="submit">Додати новину</button>
        <button type="button" onClick={onClose}>
          Скасувати
        </button>
      </div>
    </form>
  );
};
