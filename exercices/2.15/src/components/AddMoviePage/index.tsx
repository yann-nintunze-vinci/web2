import "./AddMoviePage.css";
import { useState, SyntheticEvent } from "react";
import { FilmContext } from "../../types";
import { useNavigate, useOutletContext } from "react-router-dom";

const AddMovie = () => {
  const { addFilm }: FilmContext = useOutletContext();

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [duration, setduration] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    addFilm({ title: title, director: director, duration: Number(duration) });
    navigate("/movie-list");
  };

  const handleTitleChange = (e: SyntheticEvent) => {
    const titleInput = e.target as HTMLInputElement;
    console.log("change in titleInput:", titleInput.value);
    setTitle(titleInput.value);
  };

  const handleDirectorChange = (e: SyntheticEvent) => {
    const directorInput = e.target as HTMLInputElement;
    console.log("change in directorInput:", directorInput.value);
    setDirector(directorInput.value);
  };

  const handledurationChange = (e: SyntheticEvent) => {
    const durationInput = e.target as HTMLInputElement;
    console.log("change in durationInput:", durationInput.value);
    setduration(durationInput.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Titre</label>
      <input
        value={title}
        type="text"
        id="title"
        name="title"
        onChange={handleTitleChange}
        required
      />
      <label htmlFor="director">Director</label>
      <input
        value={director}
        type="text"
        id="director"
        name="director"
        onChange={handleDirectorChange}
        required
      />
      <label htmlFor="duration">Duration</label>
      <input
        value={duration}
        type="number"
        id="duration"
        name="duration"
        onChange={handledurationChange}
        required
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddMovie;
