import PageFilm from "./PageFilm";
import './MovieListPage.css';
import { FilmContext } from "../../types";
import { useOutletContext } from "react-router-dom";

const MovieListPage = () => {
  const {
    films
  }: FilmContext = useOutletContext();

  return (
    <div>
      <h2>List of my favorite movies</h2>
      <PageFilm films={films} />
    </div>
  );
};

export default MovieListPage;
