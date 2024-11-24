import { Film } from "../../types";
import { useState } from "react";

interface FilmProps {
  films: Film[];
}

const PageFilm = ({ films }: FilmProps) => {
  return (
    <ul>
      {films.map((film, index) => (
        <FilmList film={film} index={index} />
      ))}
    </ul>
  );
};

interface FilmListProps {
  film: Film;
  index: number;
}

const FilmList = ({ film, index }: FilmListProps) => {
  const [descPrinted, setDescPrinted] = useState(false);

  return (
    <li
      key={index}
      onClick={() => setDescPrinted(!descPrinted)}
      className="listFilmPage"
    >
      {film.title} - Realisateur : {film.director}
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