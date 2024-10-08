import { Router } from "express";
import path from "node:path";
import { Film, NewFilm } from "../types";
import { parse, serialize } from "../utils/json";
const jsonDbPath = path.join(__dirname, "/../data/films.json");

const router = Router();

const defaultFilms: Film[] = [
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
  const films = parse(jsonDbPath, defaultFilms);
  let filteredFilms = films;
  if (req.query["starts-with"]) {
    const keyword = String(req.query["starts-with"]).toLowerCase().trim();
    filteredFilms = films.filter((film) => film.title.toLowerCase().trim().startsWith(keyword));
  }
  if (req.query["starts-with"] === "") {
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
  if (req.query["order-by"] && req.query["order-by"] !== "title" && req.query["order-by"] !== "duration") {
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
  const films = parse(jsonDbPath, defaultFilms);
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

  const status400: string[] = [];

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

  const films = parse(jsonDbPath, defaultFilms);

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
  serialize(jsonDbPath, films);
  return res.json(newFilm);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res.status(400).json("The id parameter must be a number");
  const films = parse(jsonDbPath, defaultFilms);
  const index = films.findIndex((film) => film.id === id);
  if (index === -1)
    return res.sendStatus(404);
  const deletedFilm = films.splice(index, 1);
  serialize(jsonDbPath, films);
  return res.json(deletedFilm);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res.status(400).json("The id parameter must be a number");
  const films = parse(jsonDbPath, defaultFilms);
  const film = films.find((film) => film.id === id);
  if (!film)
    return res.sendStatus(404);

  const status400: string[] = [];

  const body: unknown = req.body;

  if (!body || typeof body !== "object")
    return res.sendStatus(400);

  const allowedProperties = ["title", "director", "duration", "budget", "description", "imageUrl"];

  const hasUnexpectedProperties = Object.keys(body).some((key) => !allowedProperties.includes(key));

  if (hasUnexpectedProperties)
    return res.status(400).json("The body must only contain the following properties: title, director, duration, budget, description, imageUrl");

  if ("title" in body && (typeof body.title !== "string" || !body.title.trim()))
    status400.push("The title must be a non-empty string");

  if ("director" in body && (typeof body.director !== "string" || !body.director.trim()))
    status400.push("The director must be a non-empty string");

  if ("duration" in body && (typeof body.duration !== "number" || body.duration <= 0))
    status400.push("The duration must be a positive number");

  if ("budget" in body && (typeof body.budget !== "number" || body.budget <= 0))
    status400.push("The budget must be a positive number");

  if ("description" in body && (typeof body.description !== "string" || !body.description.trim()))
    status400.push("The description must be a non-empty string");

  if ("imageUrl" in body && (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
    status400.push("The imageUrl must be a non-empty string");

  if (status400.length > 0)
    return res.status(400).json(status400);

  const { title, director, duration, budget, description, imageUrl }: Partial<NewFilm> = body;

  if (title)
    film.title = title;
  if (director)
    film.director = director;
  if (duration)
    film.duration = duration;
  if (budget)
    film.budget = budget;
  if (description)
    film.description = description;
  if (imageUrl)
    film.imageUrl = imageUrl;

  serialize(jsonDbPath, films);

  return res.json(film);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res.status(400).json("The id parameter must be a number");
  const films = parse(jsonDbPath, defaultFilms);
  const film = films.find((film) => film.id === id);

  const status400: string[] = [];

  const body: unknown = req.body;

  if (!body || typeof body !== "object")
    return res.sendStatus(400);

  const allowedProperties = ["title", "director", "duration", "budget", "description", "imageUrl"];

  const hasUnexpectedProperties = Object.keys(body).some((key) => !allowedProperties.includes(key));

  if (hasUnexpectedProperties)
    return res.status(400).json("The body must only contain the following properties: title, director, duration, budget, description, imageUrl");

  if (!("title" in body) || typeof body.title !== "string" || !body.title.trim())
    status400.push("The title must be a non-empty string");

  if (!("director" in body) || typeof body.director !== "string" || !body.director.trim())
    status400.push("The director must be a non-empty string");

  if (!("duration" in body) || typeof body.duration !== "number" || body.duration <= 0)
    status400.push("The duration must be a positive number");

  if ("budget" in body && (typeof body.budget !== "number" || body.budget <= 0))
    status400.push("The budget must be a positive number");

  if ("description" in body && (typeof body.description !== "string" || !body.description.trim()))
    status400.push("The description must be a non-empty string");

  if ("imageUrl" in body && (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
    status400.push("The imageUrl must be a non-empty string");

  if (status400.length > 0)
    return res.status(400).json(status400);

  const { title, director, duration, budget, description, imageUrl } = body as NewFilm;

  const contains = films.some((film) => film.title === title && film.director === director);

  if (contains)
    return res.status(409).json("A film with the same title and director already exists");

  if (!film) {
    const nextId = films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;
    const newFilm: Film = {
      id: nextId,
      title,
      director,
      duration,
      budget,
      description,
      imageUrl
    };
    films.push(newFilm);
    serialize(jsonDbPath, films);
    return res.json(newFilm);
  } else {
    film.title = title;
    film.director = director;
    film.duration = duration;
    film.budget = budget;
    film.description = description;
    film.imageUrl = imageUrl;
    serialize(jsonDbPath, films);
    return res.json(film);
  }
});


export default router;