import { Link } from "react-router-dom";

const NavBar = () => (
  <nav>
    <Link to={"/"} className="nav-bar">
      Home
    </Link>
    <Link to={"/cinema"} className="nav-bar">
      Cinema
    </Link>
    <Link to={"/movie-list"} className="nav-bar">
      Movie List
    </Link>
    <Link to={"/add-movie"} className="nav-bar">
      Add movie
    </Link>
  </nav>
);

export default NavBar;
