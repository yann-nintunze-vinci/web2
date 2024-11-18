import { useOutletContext, useParams } from "react-router-dom";
import { FilmContext } from "../../types";

const MovieDetails = () => {
  const { films }: FilmContext = useOutletContext();
  const { id } = useParams();
  const film = films.find((film) => film.id === Number(id));
  if (film === undefined) {
    return (
      <div>
        <p>Film non trouvé</p>
      </div>
    );
  }
  return (
    <div>
        <ul>
            <li>id: {film.id}</li>
            <li>title: {film.title}</li>
            <li>director: {film.director}</li>
            <li>minutes: {film.minutes}</li>
        </ul>
    </div>
  );
};

export default MovieDetails;
