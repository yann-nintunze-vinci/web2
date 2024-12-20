interface Film {
    id: number;
    title: string;
    director: string;
    minutes: number;
}

type NewFilm = Omit<Film, "id">;

interface FilmContext {
    films: Film[];
    addFilm: (newFilm: NewFilm) => void;
}

export type { Film, FilmContext, NewFilm };