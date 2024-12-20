import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./Navbar";
import { useEffect, useState } from "react";
import {
  MaybeAuthenticatedUser,
  Movie,
  MovieContext,
  NewMovie,
  User,
  AuthenticatedUser,
} from "../types";
import {
  storeAuthenticatedUser,
  getAuthenticatedUser,
} from "../utils/session";
import { getTheme, storeTheme } from "../utils/theme";
import {
  addMovie,
  deleteMovie,
  fetchMovies,
  patchMovie,
} from "../utils/film-service";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [authenticatedUser, setAuthenticatedUser] =
    useState<MaybeAuthenticatedUser>(undefined);
  const [theme, setTheme] = useState<string>(getTheme()?.theme || "light");
  const [remember, setRemember] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    storeTheme({ theme });
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const initMovies = async () => {
    try {
      const movies = await fetchMovies();
      setMovies(movies);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initMovies();
    const authenticatedUser = getAuthenticatedUser();
    if (authenticatedUser) {
      setAuthenticatedUser(authenticatedUser);
    }
  }, []);

  const onMovieAdded = async (newMovie: NewMovie) => {
    console.log("Movie to add:", newMovie);
    try {
      if (!authenticatedUser)
        throw new Error("You must be authenticated to add a movie");
      const movieToBeAdded = await addMovie(newMovie, authenticatedUser);
      console.log("Movie added:", movieToBeAdded);
      await initMovies();
      navigate("/movie-list");
    } catch (error) {
      console.error(error);
    }
  };

  const onMovieDeleted = async (movie: Movie) => {
    console.log("Movie to delete:", movie);
    try {
      if (!authenticatedUser)
        throw new Error("You must be authenticated to delete a movie");
      await deleteMovie(movie, authenticatedUser);
      console.log("Movie deleted:", movie);
      await initMovies();
    } catch (error) {
      console.error(error);
    }
  };

  const onMoviePatched = async (id: number, updateMovie: Partial<NewMovie>) => {
    try {
      if (!authenticatedUser)
        throw new Error("You must be authenticated to delete a movie");
      await patchMovie(id, updateMovie, authenticatedUser);
      console.log("Movie-id : ", id, "Infos patched:", updateMovie);
      await initMovies();
    } catch (error) {
      console.error(error);
    }
  };

  const registerUser = async (newUser: User) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/auths/register", options);

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const createdUser: AuthenticatedUser = await response.json();
      console.log("createdUser: ", createdUser);
    } catch (err) {
      console.error("registerUser::error: ", err);
      throw err;
    }
  };

  const loginUser = async (user: User) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/auths/login", options);

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const authenticatedUser: AuthenticatedUser = await response.json();

      setAuthenticatedUser(authenticatedUser);
      if (remember) {
        storeAuthenticatedUser(authenticatedUser);
      }
      console.log("authenticatedUser: ", authenticatedUser);
    } catch (err) {
      console.error("loginUser::error: ", err);
      throw err;
    }
  };

  const movieContext: MovieContext = {
    movies,
    onMovieAdded,
    onMovieDeleted,
    onMoviePatched,
    registerUser,
    loginUser,
    authenticatedUser,
    remember,
    setRemember,
  };

  return (
    <div>
      <Header
        urlLogo="https://media.istockphoto.com/id/1429764305/fr/vectoriel/bande-de-film-vierge-isol%C3%A9e-sur-le-fond-blanc.jpg?s=1024x1024&w=is&k=20&c=is5Y6cun0NC8PxJd51p4YnUoLUpyb758Bdigh4Bqn48="
        theme={theme}
      >
        <h1>Tous sur les films</h1>
        <h2>{authenticatedUser && `Bonjour ${authenticatedUser.username}`}</h2>
        <NavBar
          authenticatedUser={authenticatedUser}
          setAuthenticatedUser={setAuthenticatedUser}
          setTheme={setTheme}
          theme={theme}
        />
      </Header>

      <main className="page-content">
        <Outlet context={movieContext} />
      </main>

      <Footer
        urlLogo="https://media.istockphoto.com/id/1202770152/fr/photo/bobine-de-film-disolement-sur-le-fond-jaune-lumineux-dans-les-couleurs-pastel.jpg?s=1024x1024&w=is&k=20&c=2yKBrC8oyimPdW-5IxFWN_zxFPVK3KWYL9OE2gVmVX4="
        theme={theme}
      >
        <p>© myMovies</p>
      </Footer>
    </div>
  );
};

export default App;
