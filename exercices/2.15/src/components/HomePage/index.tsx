import { useOutletContext, useNavigate } from "react-router-dom";
import { FilmContext } from "../../types";
import "./HomePage.css";

interface HomePageProps {
  children: React.ReactNode;
}

const HomePage = ({ children }: HomePageProps) => <div>{children}</div>;

const HomePageComp = () => {
  const navigate = useNavigate();
  const { films }: FilmContext = useOutletContext();
  return (
    <HomePage>
      <div>
        <ul className="list">
          {films.map((film) => (
            <li onClick={() => navigate(`/details/${film.id}`)} key={film.id}>
              {film.title}
            </li>
          ))}
        </ul>
      </div>
    </HomePage>
  );
};

export default HomePageComp;
