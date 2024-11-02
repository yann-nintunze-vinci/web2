import { Film } from "../../types";

interface FilmProps {
  films: Film[];
}

const PageFilm = ({ films }: FilmProps) => {
  return (
    <ul>
      {films.map((films, index) => (
        <li key={index} >{films.title} - {films.director} - {films.minutes} minutes
        </li>
      ))}
    </ul>
  );
};

export default PageFilm;
