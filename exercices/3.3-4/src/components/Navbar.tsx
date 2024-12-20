import { Link } from "react-router-dom";
import { MaybeAuthenticatedUser } from "../types";
import "./Navbar.css";
import { clearAuthenticatedUser } from "../utils/session";

interface NavBarProps {
  authenticatedUser: MaybeAuthenticatedUser;
  setAuthenticatedUser: (a: MaybeAuthenticatedUser) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const NavBar = ({ authenticatedUser, setAuthenticatedUser, theme, setTheme }: NavBarProps) => {
  const handleLogout = () => {
    clearAuthenticatedUser();
    setAuthenticatedUser(undefined);
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/cinemas">Cinemas</Link>
      <Link to="/movie-list">My favorite movies</Link>
      {authenticatedUser ? (
        <>
          <Link to="/add-movie">Add a movie</Link>
          <button onClick={handleLogout}>Log out</button>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Switch theme
      </button>
    </nav>
  );
};

<nav className="navbar"></nav>;

export default NavBar;
