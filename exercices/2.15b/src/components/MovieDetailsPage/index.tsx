import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { FilmContext } from "../../types";

const MovieDetails = () => {
  const { films, deleteFilm }: FilmContext = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const film = films.find((film) => film.id === Number(id));
  if (film === undefined) {
    return (
      <div>
        <p>Film non trouvé</p>
      </div>
    );
  }

  const handleClick = () => {
    deleteFilm(film.id);
    navigate("/");
  };
  
  return (
    <div>
      <ul>
        <li>Id: {film.id}</li>
        <li>Title: {film.title}</li>
        <li>Director: {film.director}</li>
        <li>Duration: {film.duration}</li>
      </ul>
      <button onClick={handleClick}>Delete</button>
    </div>
  );
};

export default MovieDetails;
