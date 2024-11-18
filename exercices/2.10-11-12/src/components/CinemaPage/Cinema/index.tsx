import "./Cinema.css";
import FilmPage from "../Film";
import { NewFilm } from "../../../types";

interface CinemaProps {
  name: string;
  films: NewFilm[];
}

const Cinema = ({ name, films }: CinemaProps) => {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {films.map((film, index) => (
          <li key={index}>
            <FilmPage
              title={film.title}
              director={film.director}
              minutes={film.minutes}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cinema;
