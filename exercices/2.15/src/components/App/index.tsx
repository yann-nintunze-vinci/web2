import "./App.css";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { FilmContext, Film, NewFilm } from "../../types";

const App = () => {
  const [films, setFilms] = useState<Film[]>([]);

  async function getAllFilms() {
    try {
      const response = await fetch("/api/films");

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const films = await response.json();
      return films;
    } catch (err) {
      console.error("getAllFilms::error: ", err);
      throw err;
    }
  }

  const fetchFilms = async () => {
    try {
      const films = await getAllFilms();
      setFilms(films);
    } catch (err) {
      console.error("HomePage::error: ", err);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  const addFilm = async (newFilm: NewFilm) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(newFilm),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/films", options);

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const createdFilm = await response.json();

      setFilms([...films, createdFilm]);
    } catch (err) {
      console.error("AddMoviePage::error: ", err);
    }
  };

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

export default App;
