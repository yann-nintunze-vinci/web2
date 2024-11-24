import { Film, FilmContext } from "../../types";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

interface FilmProps {
  films: Film[];
}

const PageFilm = ({ films }: FilmProps) => {
  return (
    <ul>
      {films.map((film, index) => (
        <FilmList film={film} key={index} />
      ))}
    </ul>
  );
};

interface FilmListProps {
  film: Film;
}

const FilmList = ({ film }: FilmListProps) => {
  const [descPrinted, setDescPrinted] = useState(false);

  const { deleteFilm }: FilmContext = useOutletContext();

  return (
    <li
      onClick={() => setDescPrinted(!descPrinted)}
      className="listFilmPage"
    >
      {film.title} - Realisateur : {film.director}
      <button onClick={() => deleteFilm(film.id)}>Delete</button>
      {descPrinted && (
        <span style={{ color: "grey", fontStyle: "italic" }}>
          <br />
          {film.duration} minutes
        </span>
      )}
    </li>
  );
};

export default PageFilm;
