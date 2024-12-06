import { Router } from "express";
import { authorize } from "../utils/auths";
import {
  createOneComment,
  deleteOneComment,
  readAllComments,
  readOneComment,
  updateOneFilm,
} from "../services/comments";
import { NewComment, Comment } from "../types";

const router = Router();

router.get("/", authorize, (req, res) => {
  const film =
    req.query.film === undefined ? undefined : String(req.query.film);
  const username =
    req.query.username === undefined ? undefined : String(req.query.username);

  const comments = readAllComments(film, username);
  return res.json(comments);
});

router.get("/:id", authorize, (req, res) => {
  const id = Number(req.params.id);
  const comment = readOneComment(id);
  if (!comment) return res.sendStatus(404);

  return res.json(comment);
});

router.post("/", authorize, (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("film" in body) ||
    !("username" in body) ||
    !("comment" in body) ||
    typeof body.film !== "number" ||
    typeof body.username !== "string" ||
    typeof body.comment !== "string" ||
    body.film <= 0 ||
    !body.username.trim() ||
    !body.comment.trim()
  ) {
    return res.sendStatus(400);
  }

  const { film, username, comment } = body as NewComment;

  const addedComment = createOneComment({ film, username, comment });

  return res.json(addedComment);
});

router.delete("/:id", authorize, (req, res) => {
  const id = Number(req.params.id);
  const deletedComment = deleteOneComment(id);
  if (!deletedComment) return res.sendStatus(404);
  return res.json(deletedComment);
});

router.patch("/:id", authorize, (req, res) => {
  const id = Number(req.params.id);
  const body: unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    ("film" in body && (typeof body.film !== "number" || body.film <= 0)) ||
    ("username" in body &&
      (typeof body.username !== "string" || !body.username.trim())) ||
    ("comment" in body &&
      (typeof body.comment !== "string" || !body.comment.trim()))
  ) {
    return res.sendStatus(400);
  }
  const { film, username, comment }: Partial<Comment> = body;

  const updatedComment = updateOneFilm(id, { film, username, comment });
  if (!updatedComment) return res.sendStatus(404);
  return res.json(updatedComment);
});

export default router;
