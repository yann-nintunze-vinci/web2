import { useOutletContext, useNavigate } from "react-router-dom";
import { FilmContext } from "../../types";
import "./HomePage.css";

interface HomePageProps {
  children: React.ReactNode;
}

const HomePage = ({ children }: HomePageProps) => <div>{children}</div>;

const HomePageComp = () => {
  const navigate = useNavigate();
  const { films, deleteFilm }: FilmContext = useOutletContext();
  return (
    <HomePage>
      <div>
        <ul className="list">
          {films.map((film) => (
            <div className="list-item">
              <li key={film.id}>
                <span onClick={() => navigate(`/details/${film.id}`)}>
                  {film.title}
                </span>
                <button onClick={() => deleteFilm(film.id)}>Delete</button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </HomePage>
  );
};

export default HomePageComp;
