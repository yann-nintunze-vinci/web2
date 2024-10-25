import './Cinema.css';
import MoviePage from '../Movie'

interface Movie {
  title: string;
  director: string;
  description: string;
}

interface CinemaProps {
  name: string;
  movies: Movie[];
}

const Cinema = ({ name, movies }: CinemaProps) => {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <MoviePage title={movie.title} director={movie.director} description={movie.description}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cinema;