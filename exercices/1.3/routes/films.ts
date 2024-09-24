import { Router } from "express";

import { Film, NewFilm } from "../types";

const router = Router();

const films: Film[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    duration: 142,
    budget: 25000000,
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    imageUrl: "https://example.com/shawshank.jpg"
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    duration: 175
    // Pas de budget, description ou imageUrl
  },
  {
    id: 3,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    duration: 152,
    description: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
    // Pas de budget ou imageUrl
  },
  {
    id: 4,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    duration: 154,
    imageUrl: "https://example.com/pulpfiction.jpg"
    // Pas de budget ou description
  },
  {
    id: 5,
    title: "The Lord of the Rings: The Return of the King",
    director: "Peter Jackson",
    duration: 201,
    budget: 94000000
    // Pas de description ou imageUrl
  }
];

router.get("/", (req, res) => {
  if (!req.query["minimum-duration"])
    return res.json(films);
  const minDuration = Number(req.query["minimum-duration"]);
  const filteredFilms = films.filter((film) => film.duration >= minDuration);
  return res.json(filteredFilms);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);
  if (!film)
    return res.sendStatus(404);
  return res.json(film);
});

router.post("/", (req, res) => {
  const body: unknown = req.body;

  const allowedProperties = ["title", "director", "duration", "budget", "description", "imageUrl"];

  if (!body || typeof body !== "object")
    return res.sendStatus(400);

  const bodyKeys = Object.keys(body);
  const hasUnexpectedProperties = bodyKeys.some((key) => !allowedProperties.includes(key));
  if (hasUnexpectedProperties)
    return res.status(400).json({ message: "Unexpected properties found" });

  if (!("title" in body) || !("director" in body) || !("duration" in body) || typeof body.title !== "string" || typeof body.director !== "string" || typeof body.duration !== "number")
    return res.sendStatus(400);

  if (body.duration <= 0)
    return res.status(400).json({ message: "The duration must be a positive number" });

  const { title, director, duration, budget, description, imageUrl } = body as NewFilm & { budget?: number, description?: string, imageUrl?: string };

  if (budget !== undefined && budget <= 0)
    return res.status(400).json({ message: "The budget must be a positive number" });

  const nextId = films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;

  const newFilm: Film = {
    id: nextId,
    title,
    director,
    duration,
    ...(budget && { budget }),
    ...(description && { description }),
    ...(imageUrl && { imageUrl })
  };

  films.push(newFilm);

  return res.json(films);
});


export default router;