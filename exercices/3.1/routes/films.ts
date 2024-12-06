import { Router } from "express";
import { authorize } from "../utils/auths";
import { NewFilm } from "../types";
import {
  createFilm,
  deleteFilm,
  readAllFilms,
  readOneFilm,
  updateFilm,
} from "../services/films";

const router = Router();

router.get("/", (_req, res) => {
  const films = readAllFilms();
  return res.json(films);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = readOneFilm(id);
  if (!film) return res.sendStatus(404);

  return res.json(film);
});

router.post("/", authorize, (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    ("budget" in body && (typeof body.budget !== "number" || body.budget <= 0)) ||
    ("description" in body && (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body && (typeof body.imageUrl !== "string" || !body.imageUrl.trim())) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0
  ) {
    return res.sendStatus(400);
  }

  console.log(body);

  const { title, director, duration, budget, description, imageUrl } =
    body as NewFilm;
  const addedFilm = createFilm({
    title,
    director,
    duration,
    budget,
    description,
    imageUrl,
  });
  return res.json(addedFilm);
});

router.delete("/:id", authorize, (req, res) => {
  const id = Number(req.params.id);
  const deletedFilm = deleteFilm(id);
  if (!deletedFilm) return res.sendStatus(404);
  return res.json(deletedFilm);
});

router.patch("/:id", authorize, (req, res) => {
  const id = Number(req.params.id);
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    ("title" in body &&
      (typeof body.title !== "string" || !body.title.trim())) ||
    ("director" in body &&
      (typeof body.director !== "string" || !body.director.trim())) ||
    ("duration" in body &&
      (typeof body.duration !== "number" || body.duration <= 0)) ||
    ("budget" in body &&
      (typeof body.budget !== "number" || body.budget <= 0)) ||
    ("description" in body &&
      (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body &&
      (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
  ) {
    return res.sendStatus(400);
  }
  const {
    title,
    director,
    duration,
    budget,
    description,
    imageUrl,
  }: Partial<NewFilm> = body;
  
  const updatedFilm = updateFilm(id, { title, director, duration, budget, description, imageUrl });
  if (!updatedFilm) return res.sendStatus(404);
  return res.json(updatedFilm);
});

export default router;
