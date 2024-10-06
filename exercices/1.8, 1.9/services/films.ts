import path from "node:path";
import { Film, NewFilm } from "../types";
import { parse, serialize } from "../utils/json";
const jsonDbPath = path.join(__dirname, "/../data/films.json");

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

function filterByStartsWith(keyword: string) {
    const films = parse(jsonDbPath, defaultFilms);
    keyword = keyword.toLowerCase().trim();
    if (keyword === "")
        throw new Error("The keyword must not be empty");
    return films.filter(film => film.title.toLowerCase().startsWith(keyword));
}

function filterByMinimumDuration(minDuration: number) {
    const films = parse(jsonDbPath, defaultFilms);
    if (isNaN(minDuration) || minDuration <= 0)
        throw new Error("The minimum duration must be a positive number");
    return films.filter(film => film.duration >= minDuration);
}

function sortByOrder(orderBy: string) {
    const films = parse(jsonDbPath, defaultFilms);
    if (orderBy !== "title" && orderBy !== "duration")
        throw new Error("The order-by parameter must be either 'title' or 'duration'");
    return films.sort((a, b) => orderBy === "title" ? a.title.localeCompare(b.title) : a.duration - b.duration);
}

function paginate(films: Film[], page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return films.slice(startIndex, endIndex);
}

function readAllFilms(startsWith: string | undefined, minimumDuration: number | undefined, orderBy: string | undefined, page: number, limit: number): Film[] {
    let films = parse(jsonDbPath, defaultFilms);
    if (startsWith) {
        films = filterByStartsWith(startsWith);
    } else if (minimumDuration) {
        films = filterByMinimumDuration(minimumDuration);
    } else if (orderBy) {
        films = sortByOrder(orderBy);
    }
    return paginate(films, page, limit);
}

function readOneFilm(id: number): Film | undefined {
    const films = parse(jsonDbPath, defaultFilms);
    const film = films.find(film => film.id === id);
    if (!film)
        return undefined;
    return film;
}

function hasDuplicate(films: Film[], title: string, director: string): boolean {
    return films.some(f => f.title === title && f.director === director);
  }

function createOneFilm(newFilm: NewFilm): Film | undefined {
    const films = parse(jsonDbPath, defaultFilms);
    const nextId = films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;
    const createdFilm: Film = { id: nextId, ...newFilm };
    if (hasDuplicate(films, createdFilm.title, createdFilm.director))
        return undefined;
    films.push(createdFilm);
    serialize(jsonDbPath, films);
    return createdFilm;
}

function deleteOneFilm(id: number): Film | undefined {
    const films = parse(jsonDbPath, defaultFilms);
    const index = films.findIndex(f => f.id === id);
    if (index === -1)
        return undefined;
    const deletedElements = films.splice(index, 1);
    serialize(jsonDbPath, films);
    return deletedElements[0];
}

function updateOneFilm(id: number, newFilm: Partial<Film>): Film | number {
    const films = parse(jsonDbPath, defaultFilms);
    const film = films.find(f => f.id === id);
    if (!film)
        return 404;
    if (newFilm.title !== undefined && newFilm.director !== undefined && hasDuplicate(films, newFilm.title, newFilm.director))
        return 409;
    if (newFilm.title !== undefined)
        film.title = newFilm.title!;
    if (newFilm.director !== undefined)
        film.director = newFilm.director!;
    if (newFilm.duration !== undefined)
        film.duration = newFilm.duration!;
    if (newFilm.budget !== undefined)
        film.budget = newFilm.budget!;
    if (newFilm.description !== undefined)
        film.description = newFilm.description!;
    if (newFilm.imageUrl !== undefined)
        film.imageUrl = newFilm.imageUrl!;

    serialize(jsonDbPath, films);
    return film;
}

function hasUnexpectedProperties(body: Object, allowedProperties: string[]): boolean {
    return Object.keys(body).some(key => !allowedProperties.includes(key));
}

export { readAllFilms, readOneFilm, createOneFilm, deleteOneFilm, updateOneFilm, hasUnexpectedProperties };