import path from "node:path";
import { parse, serialize } from "../utils/json";
import { Film, NewFilm } from "../types";
const jsonDbPath = path.join(__dirname, "/../data/films.json");

const defaultFilms: Film[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    duration: 142,
    budget: 25000000,
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    imageUrl: "https://example.com/shawshank.jpg",
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    duration: 175,
  },
  {
    id: 3,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    duration: 152,
    description:
      "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
  },
];

function readAllFilms(): Film[] {
  const films = parse(jsonDbPath, defaultFilms);
  return films;
}

function readOneFilm(id: number): undefined | Film {
  const films = parse(jsonDbPath, defaultFilms);
  return films.find((film) => film.id === id);
}

function createFilm(newFilm: NewFilm): Film {
  const films = parse(jsonDbPath, defaultFilms);
  const nextId = films[films.length - 1].id + 1;
  const film: Film = { id: nextId, ...newFilm };
  const updatedFilms = [...films, film];
  serialize(jsonDbPath, updatedFilms);
  return film;
}

function deleteFilm(id: number): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const index = films.findIndex((film) => film.id === id);
  if (index === -1) return undefined;

  const deletedElements = films.splice(index, 1);
  serialize(jsonDbPath, films);
  return deletedElements[0];
}

function updateFilm(
  id: number,
  updatedFilm: Partial<NewFilm>
): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const film = films.find((film) => film.id === id);
  if (!film) return undefined;

  console.log(film);

  if (updatedFilm.title !== undefined) film.title = updatedFilm.title!;

  if (updatedFilm.director !== undefined) film.director = updatedFilm.director!;

  if (updatedFilm.duration !== undefined) film.duration = updatedFilm.duration!;

  if (updatedFilm.budget !== undefined) film.budget = updatedFilm.budget!;

  if (updatedFilm.description !== undefined)
    film.description = updatedFilm.description!;

  if (updatedFilm.imageUrl !== undefined) film.imageUrl = updatedFilm.imageUrl!;

  serialize(jsonDbPath, films);
  return film;
}

export { readAllFilms, readOneFilm, createFilm, deleteFilm, updateFilm };
