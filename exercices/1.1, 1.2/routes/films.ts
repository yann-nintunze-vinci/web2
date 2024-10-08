import { Router } from "express";

import { Film } from "../types";

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

router.get("/", (_req, res) => {
  return res.json(films);
});

export default router;