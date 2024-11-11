import "./Cinema.css";
import FilmPage from "../Film";
import { Film } from "../../../types";

interface CinemaProps {
  name: string;
  films: Film[];
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
              description={film.description}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cinema;
