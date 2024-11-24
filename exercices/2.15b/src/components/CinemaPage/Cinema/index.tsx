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
          <FilmPage
            key={index}
            title={film.title}
            director={film.director}
            duration={film.duration}
          />
        ))}
      </ul>
    </div>
  );
};

export default Cinema;
