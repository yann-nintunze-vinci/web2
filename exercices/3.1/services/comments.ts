import path from "node:path";
import { Comment, NewComment } from "../types";
import { parse, serialize } from "../utils/json";
import { readOneFilm } from "./films";
const jsonDbPath = path.join(__dirname, "/../data/comments.json");

const defaultComments: Comment[] = [
  {
    id: 1,
    film: 1,
    username: "admin",
    comment: "boring",
  },
  {
    id: 2,
    film: 1,
    username: "casual",
    comment: "awesome",
  },
  {
    id: 3,
    film: 2,
    username: "casual",
    comment: "amazing",
  },
];

function filterByFilm(filmTitle: string): Comment[] | undefined {
  const comments = parse(jsonDbPath, defaultComments);
  filmTitle = filmTitle.toLowerCase().trim();
  if (!filmTitle) return undefined;

  return comments.filter((comment) => {
    const film = readOneFilm(comment.film);
    return film && film.title.toLowerCase() === filmTitle;
  });
}

function filterByUser(userName: string): Comment[] | undefined {
  const comments = parse(jsonDbPath, defaultComments);
  userName = userName.toLowerCase().trim();
  if (!userName) return undefined;

  return comments.filter(
    (comment) => comment.username.toLowerCase().trim() === userName
  );
}

function readAllComments(
  filmTitle: string | undefined,
  userName: string | undefined
): Comment[] | undefined {
  let comments: Comment[] | undefined = parse(jsonDbPath, defaultComments);
  if (filmTitle) {
    comments = filterByFilm(filmTitle);
  } else if (userName) {
    comments = filterByUser(userName);
  }
  return comments;
}

function readOneComment(id: number): Comment | undefined {
  const comments = parse(jsonDbPath, defaultComments);
  return comments.find((comment) => comment.id === id);
}

function createOneComment(newComment: NewComment): Comment {
  const comments = parse(jsonDbPath, defaultComments);
  const nextId =
    comments.reduce(
      (max, comment) => (comment.id > max ? comment.id : max),
      0
    ) + 1;
  const createdComment = { id: nextId, ...newComment };
  const updatedFilm = [...comments, createdComment];
  serialize(jsonDbPath, updatedFilm);
  return createdComment;
}

function deleteOneComment(id: number): Comment | undefined {
  const comments = parse(jsonDbPath, defaultComments);
  const index = comments.findIndex((comment) => comment.id === id);
  if (index === -1) return undefined;
  const deletedElements = comments.splice(index, 1);
  return deletedElements[0];
}

function updateOneFilm(
  id: number,
  updatedComment: Partial<Comment>
): Comment | undefined {
  const comments = parse(jsonDbPath, defaultComments);
  const comment = comments.find((comment) => comment.id === id);
  if (!comment) return undefined;

  if (updatedComment.film !== undefined) comment.film = updatedComment.film!;

  if (updatedComment.username !== undefined)
    comment.username = updatedComment.username!;

  if (updatedComment.comment !== undefined)
    comment.comment = updatedComment.comment!;

  serialize(jsonDbPath, comments);

  return comment;
}

export {
  readAllComments,
  readOneComment,
  createOneComment,
  deleteOneComment,
  updateOneFilm,
};
