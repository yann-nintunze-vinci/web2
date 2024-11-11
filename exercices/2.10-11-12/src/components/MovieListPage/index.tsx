import { useState, SyntheticEvent } from "react";
import PageFilm from "./PageFilm";
import './MovieListPage.css'

const defaultFilm = [
  {
    title: "Shawshank Redemption",
    director: "Frank Darabont",
    minutes: 144,
  },
  {
    title: "Green Book : Sur les routes du sud",
    director: "Peter Farrelly",
    minutes: 130,
  },
  {
    title: "Slumdog Millionaire",
    director: "Danny Boyle",
    minutes: 120,
  },
];
const MovieListPage = () => {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [minutes, setMinutes] = useState("");
  const [films, setFilms] = useState(defaultFilm);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("submit:", title, director, minutes);
    const newFilm = {
        title: title,
        director: director,
        minutes: Number(minutes),
    }

    setFilms([...films, newFilm]);
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
    <div>
      <h2>List of my favorite movies</h2>
      <PageFilm films={films} />
      <div>
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
      </div>
    </div>
  );
};

export default MovieListPage;
