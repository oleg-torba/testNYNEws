import { SearchForm } from "./Form/form";
import { News } from "./News/news";
import "../index.css";
export function App() {
  return (
    <>
      <div className="container">
        <SearchForm />

        <News />
      </div>
    </>
  );
}
