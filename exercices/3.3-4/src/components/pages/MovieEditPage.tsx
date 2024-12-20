import { SyntheticEvent, useState, useEffect } from "react";
import { useMatch, useNavigate, useOutletContext } from "react-router-dom";
import { MovieContext, NewMovie } from "../../types";

const MovieEditPage = () => {
  const match = useMatch("/movie-edit/:id");
  const { movies, onMoviePatched, authenticatedUser }: MovieContext =
    useOutletContext();
  const movieId = Number(match?.params.id);
  const movie = movies.find((movie) => movie.id === movieId);

  const [title, setTitle] = useState<string>("");
  const [director, setDirector] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [budget, setBudget] = useState<number | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setDirector(movie.director);
      setDuration(movie.duration);
      setImageUrl(movie.imageUrl);
      setDescription(movie.description);
      setBudget(movie.budget);
    }
  }, [movie]);

  if (!authenticatedUser) return <p>Please log in to edit a movie</p>;
  if (!movie) return <p>Movie not found</p>;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const updatedFields: Partial<NewMovie> = {};

    if (title !== movie.title) updatedFields.title = title;
    if (director !== movie.director) updatedFields.director = director;
    if (duration !== movie.duration) updatedFields.duration = duration;
    if (imageUrl !== movie.imageUrl) updatedFields.imageUrl = imageUrl;
    if (description !== movie.description)
      updatedFields.description = description;
    if (budget !== movie.budget) updatedFields.budget = budget;

    try {
      if (Object.keys(updatedFields).length > 0) {
        await onMoviePatched(movie.id, updatedFields);
      }
      navigate(`/movies/${movie.id}`);
    } catch (err) {
      console.error("MovieEditPage::error: ", err);
    }
  };

  return (
    <div>
      <h1>Edit movie n°{movieId}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          required
        />

        <label htmlFor="director">Director</label>
        <input
          type="text"
          id="director"
          name="director"
          value={director}
          onChange={(e) =>
            setDirector(e.target.value)
          }
          required
        />

        <label htmlFor="duration">Duration (minutes)</label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={duration}
          onChange={(e) =>
            setDuration(Number(e.target.value))
          }
          required
        />

        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={imageUrl || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setImageUrl(e.target.value)
          }
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={description || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />

        <label htmlFor="budget">Budget (USD)</label>
        <input
          type="number"
          id="budget"
          name="budget"
          value={budget || 0}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBudget(Number(e.target.value))
          }
        />

        <button type="submit">Save changes</button>
      </form>
    </div>
  );
};

export default MovieEditPage;
