import { Router } from "express";
import { NewFilm } from "../types";
import {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
  hasUnexpectedProperties
} from "../services/films";

const router = Router();

router.get("/", (req, res) => {
  try {
    const startsWith = req.query["starts-with"] !== undefined ? String(req.query["starts-with"]) : undefined;
    const minimumDuration = req.query["minimum-duration"] !== undefined ? Number(req.query["minimum-duration"]) : undefined;
    const orderBy = req.query["order-by"] !== undefined ? String(req.query["order-by"]) : undefined;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const films = readAllFilms(startsWith, minimumDuration, orderBy, page, limit);
    return res.json(films);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res.status(400).json("The id parameter must be a number");
  const film = readOneFilm(id);
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

  if (hasUnexpectedProperties(body, allowedProperties))
    return res.status(400).json("The body must only contain the following properties: title, director, duration, budget, description, imageUrl");
  
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

  const film = createOneFilm({ title, director, duration, budget, description, imageUrl });
  if (!film)
    return res.status(409).json("A film with the same title and director already exists");
  return res.json(film);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res.status(400).json("The id parameter must be a number");
  const deletedFilm = deleteOneFilm(id);
  if (!deletedFilm)
    return res.sendStatus(404);
  return res.json(deletedFilm);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res.status(400).json("The id parameter must be a number");

  const status400: string[] = [];

  const body: unknown = req.body;

  if (!body || typeof body !== "object")
    return res.sendStatus(400);

  const allowedProperties = ["title", "director", "duration", "budget", "description", "imageUrl"];
  if (hasUnexpectedProperties(body, allowedProperties))
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

  const updatedFilm = updateOneFilm(id, { title, director, duration, budget, description, imageUrl });
  if (updatedFilm === 404)
    return res.status(404).json("The film with the specified id does not exist");
  if (updatedFilm === 409)
    return res.status(409).json("A film with the same title and director already exists");
  return res.json(updatedFilm);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json("The id parameter must be a number");
  }

  const status400: string[] = [];
  const body: unknown = req.body;

  if (!body || typeof body !== "object") {
    return res.sendStatus(400);
  }

  const allowedProperties = ["title", "director", "duration", "budget", "description", "imageUrl"];
  if (hasUnexpectedProperties(body, allowedProperties)) {
    return res.status(400).json("The body must only contain the following properties: title, director, duration, budget, description, imageUrl");
  }

  if (!("title" in body) || typeof body.title !== "string" || !body.title.trim()) {
    status400.push("The title must be a non-empty string");
  }

  if (!("director" in body) || typeof body.director !== "string" || !body.director.trim()) {
    status400.push("The director must be a non-empty string");
  }

  if (!("duration" in body) || typeof body.duration !== "number" || body.duration <= 0) {
    status400.push("The duration must be a positive number");
  }

  if ("budget" in body && (typeof body.budget !== "number" || body.budget <= 0)) {
    status400.push("The budget must be a positive number");
  }

  if ("description" in body && (typeof body.description !== "string" || !body.description.trim())) {
    status400.push("The description must be a non-empty string");
  }

  if ("imageUrl" in body && (typeof body.imageUrl !== "string" || !body.imageUrl.trim())) {
    status400.push("The imageUrl must be a non-empty string");
  }

  if (status400.length > 0) {
    return res.status(400).json(status400);
  }

  const { title, director, duration, budget, description, imageUrl } = body as NewFilm;

  const updatedFilm = updateOneFilm(id, { title, director, duration, budget, description, imageUrl });

  if (updatedFilm === 404) {
    const createdFilm = createOneFilm({ title, director, duration, budget, description, imageUrl });
    if (!createdFilm)
      return res.status(409).json("A film with the same title and director already exists");
    return res.json(createdFilm);
  }

  if (updatedFilm === 409)
    return res.status(409).json("A film with the same title and director already exists");

  return res.json(updatedFilm);
});


export default router;