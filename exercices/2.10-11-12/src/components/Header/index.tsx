import "./Header.css";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
  children: React.ReactNode;
}

const NavBar = () => (
  <nav>
    <Link to={"/"} className="nav-bar">
      Home
    </Link>
    <Link to={"/cinema"} className="nav-bar">
      Cinema
    </Link>
    <Link to={"/movielist"} className="nav-bar">
      Movie List
    </Link>
  </nav>
);

const Header = ({ title, children }: HeaderProps) => (
  <header>
    <h1>{title}</h1>
    {children}
  </header>
);

const HeaderComp = () => {
  const title = "iMovies";
  return (
    <Header title={title}>
      <NavBar />
    </Header>
  );
};

export default HeaderComp;
