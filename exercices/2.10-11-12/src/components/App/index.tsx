import "./App.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { FilmContext, Film, NewFilm } from "../../types";

const defaultFilm = [
  {
    id: 1,
    title: "Shawshank Redemption",
    director: "Frank Darabont",
    minutes: 144,
  },
  {
    id: 2,
    title: "Green Book : Sur les routes du sud",
    director: "Peter Farrelly",
    minutes: 130,
  },
  {
    id: 3,
    title: "Slumdog Millionaire",
    director: "Danny Boyle",
    minutes: 120,
  },
];

const App = () => {
  const [films, setFilms] = useState(defaultFilm);

  const addFilm = (newFilm: NewFilm) => {
    const filmAdded = {... newFilm, id: nextFilmId(films)};
    setFilms([...films, filmAdded]);
  }

  const fullFilmContext: FilmContext = {
    films,
    addFilm,
  };

  return (
    <div>
      <Header />
      <main>
        <NavBar />
        <Outlet context={fullFilmContext} />
      </main>
      <Footer />
    </div>
  );
};

const nextFilmId = (films: Film[]) => {
  const ids = films.map((film) => film.id);
  return Math.max(... ids) + 1;
}

export default App;
