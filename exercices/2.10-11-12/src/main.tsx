import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import MovieListPage from "./components/MovieListPage";
import CinemaPage from "./components/CinemaPage";
import AddMoviePage from "./components/AddMoviePage";
import MovieDetailsPage from "./components/MovieDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <HomePage/>,
      },
      {
        path: "cinema",
        element: <CinemaPage/>,
      },
      {
        path: "movie-list",
        element: <MovieListPage/>,
      },
      {
        path: "add-movie",
        element: <AddMoviePage/>,
      },
      {
        path: "details/:id",
        element: <MovieDetailsPage/>,
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
