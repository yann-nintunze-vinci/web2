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
  let filteredFilms = films;
  if (req.query["starts-with"]) {
    const keyword = String(req.query["starts-with"]).toLowerCase().trim();
    filteredFilms = films.filter((film) => film.title.toLowerCase().trim().startsWith(keyword));
  } else if (req.query["starts-with"] === "") {
    return res.status(400).json("The starts-with query parameter must not be empty");
  }

  if (req.query["minimum-duration"]) {
    const minDuration = Number(req.query["minimum-duration"]);
    filteredFilms = films.filter((film) => film.duration >= minDuration);
  } else if (req.query["minimum-duration"] === "") {
    return res.status(400).json("The minimum-duration query parameter must not be empty");
  }

  if (req.query["order-by"] === "title") {
    filteredFilms = films.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (req.query["order-by"] === "duration") {
    filteredFilms = films.sort((a, b) => a.duration - b.duration);
  }
  if (req.query["order-by"] === "") {
    return res.status(400).json("The order query parameter must not be empty");
  }
  if (req.query["order-by"] !== "title" && req.query["order-by"] !== "duration") {
    return res.status(400).json("The order query parameter must be either title or duration");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedFilms = filteredFilms.slice(startIndex, endIndex);

  if (paginatedFilms.length === 0)
    return res.status(404).json("No films found");

  return res.json(paginatedFilms);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res.status(400).json("The id parameter must be a number");
  const film = films.find((film) => film.id === id);
  if (!film)
    return res.sendStatus(404);
  return res.json(film);
});

router.post("/", (req, res) => {
  const body: unknown = req.body;

  const allowedProperties = ["title", "director", "duration", "budget", "description", "imageUrl"];
  
  const status400 = [];

  if (!body || typeof body !== "object")
    return res.sendStatus(400);

  const bodyKeys = Object.keys(body);
  const hasUnexpectedProperties = bodyKeys.some((key) => !allowedProperties.includes(key));
  if (hasUnexpectedProperties)
    status400.push("The body must only contain the following properties: title, director, duration, budget, description, imageUrl");

  if (!("title" in body) || typeof body.title !== "string" || !body.title.trim())
    status400.push("The title must be a non-empty string");

  if (!("director" in body) || typeof body.director !== "string" || !body.director.trim())
    status400.push("The director must be a non-empty string");

  if (!("duration" in body) || typeof body.duration !== "number" || body.duration <= 0)
    status400.push("The duration must be a positive number");

  const { title, director, duration, budget, description, imageUrl } = body as NewFilm & { budget?: number, description?: string, imageUrl?: string };

  if (budget !== undefined && (typeof budget !== "number" || budget <= 0))
    status400.push("The budget must be a positive number");

  if (description !== undefined && (typeof description !== "string" || !description.trim()))
    status400.push("The description must be a non-empty string");

  if (imageUrl !== undefined && (typeof imageUrl !== "string" || !imageUrl.trim()))
    status400.push("The imageUrl must be a non-empty string");

  if (status400.length > 0)
    return res.status(400).json(status400);

  const contains = films.some((film) => film.title === title && film.director === director);

  if (contains)
    return res.status(409).json("A film with the same title and director already exists");

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