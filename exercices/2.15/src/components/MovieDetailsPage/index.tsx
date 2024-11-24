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
        <li>Id: {film.id}</li>
        <li>Title: {film.title}</li>
        <li>Director: {film.director}</li>
        <li>Duration: {film.duration}</li>
      </ul>
    </div>
  );
};

export default MovieDetails;
