import { useDispatch, useSelector } from "react-redux";
import { setDisplayedNewsCount } from "../Redux/newsSlice";
import newsCss from "./news.module.css";
import { useState } from "react";
import { AddArticleForm } from "../AddArticleForm/addArticleForm";
import { deleteNews } from "../Redux/addNewsSlice";
import { Modal } from "../Modal/modal";

export function News() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const news = useSelector((state) => state.news.news);
  const loading = useSelector((state) => state.news.loading);
  const error = useSelector((state) => state.news.error);
  const status = useSelector((state) => state.news.status);
  const displayedNewsCount = useSelector(
    (state) => state.news.displayedNewsCount
  );
  const newsList = useSelector((state) => state.addNews.newsList);

  const handleLoadMore = () => {
    dispatch(setDisplayedNewsCount(displayedNewsCount + 10));
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  const newsArray =
    news && Object.values(news)[0] ? Object.values(news)[0].articles : [];
  const addedNewsArray =
    newsList && Object.values(newsList) ? Object.values(newsList) : [];

  const allNews = addedNewsArray.concat(newsArray);
  console.log(newsList);
  const renderNewsText = (item) => {
    if (item && item.description) {
      const words = item.description.split(" ");
      const maxLength = 10;

      if (words.length <= maxLength) {
        return item.description;
      } else {
        const truncatedText = words.slice(0, maxLength).join(" ");
        return truncatedText + "...";
      }
    } else {
      return "";
    }
  };
  const handleDeleteNews = (title) => {
    dispatch(deleteNews(title));
  };
  return (
    <div className={newsCss.container}>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {!modal && allNews.length > 0 && (
        <div>
          <button onClick={toggleModal}>Додати новину</button>
        </div>
      )}
      {modal && (
        <Modal>
          <AddArticleForm onClose={toggleModal} />
        </Modal>
      )}
      {status === "succeeded" && (
        <>
          <ul className={newsCss.newsContainer}>
            {allNews.slice(0, displayedNewsCount).map((item, index) => (
              <li key={index} className={newsCss.itemList}>
                <img
                  src={item.urlToImage}
                  alt="newsImg"
                  style={{ width: "100%", height: "250px" }}
                />
                <h3>{item.title}</h3>
                <p>{item.author}</p>
                <div>
                  <p>{renderNewsText(item)}</p>
                  <a
                    className={newsCss.readMore}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more...
                  </a>
                </div>
                {addedNewsArray.some((news) => news.title === item.title) && (
                  <button onClick={() => handleDeleteNews(item.title)}>
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
          {allNews.length > 10 && (
            <button className={newsCss.loadMore} onClick={handleLoadMore}>
              Add news
            </button>
          )}
        </>
      )}
    </div>
  );
}
