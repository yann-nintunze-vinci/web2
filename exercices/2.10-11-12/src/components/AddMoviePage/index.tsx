import { useState, SyntheticEvent } from "react";
import { FilmContext } from "../../types";
import { useNavigate, useOutletContext } from "react-router-dom";

const AddMovie = () => {
  const { addFilm }: FilmContext = useOutletContext();

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [minutes, setMinutes] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    addFilm({ title: title, director: director, minutes: Number(minutes) });
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

  const handleMinutesChange = (e: SyntheticEvent) => {
    const minutesInput = e.target as HTMLInputElement;
    console.log("change in minutesInput:", minutesInput.value);
    setMinutes(minutesInput.value);
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
      <label htmlFor="minutes">Minutes</label>
      <input
        value={minutes}
        type="number"
        id="minutes"
        name="minutes"
        onChange={handleMinutesChange}
        required
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddMovie;
