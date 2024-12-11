interface Movie {
  id: number;
  title: string;
  director: string;
  duration: number;
  imageUrl?: string;
  description?: string;
  budget?: number;
}

interface User {
  username: string;
  password: string;
}

interface AuthenticatedUser {
  username: string;
  token: string;
  theme: string;
}

type MaybeAuthenticatedUser = AuthenticatedUser | undefined;

interface MovieContext {
  movies: Movie[];
  onMovieAdded: (newMovie: NewMovie) => void;
  onMovieDeleted: (movie: Movie) => void;
  onMoviePatched: (id: number, movie: Partial<NewMovie>) => Promise<void>;
  registerUser: (newUser: User) => Promise<void>;
  loginUser: (newUser: User) => Promise<void>;
  authenticatedUser: MaybeAuthenticatedUser;
}

type NewMovie = Omit<Movie, "id">;

export type {
  Movie,
  MovieContext,
  NewMovie,
  User,
  AuthenticatedUser,
  MaybeAuthenticatedUser,
};
