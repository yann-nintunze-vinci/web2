import "./App.css";

interface Movie {
  title: string;
  director: string;
}

interface CinemaProps {
  name: string;
  movies: Movie[];
}

interface PageTitleProps {
  title: string;
}

const Cinema = ({ name, movies }: CinemaProps) => {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <strong>{movie.title}</strong> - Réalisateur : {movie.director}
          </li>
        ))}
      </ul>
    </div>
  );
};

const PageTitle = ({ title }: PageTitleProps) => {
  return <h1>{title}</h1>;
};

const App = () => {
  const cinemas = [
    {
      name: "UGC DeBrouckère",
      movies: [
        {
          title: "Film 1 - DeBrouckère",
          director: "Director A",
        },
        {
          title: "Film 2 - DeBrouckère",
          director: "Director B",
        },
      ],
    },
    {
      name: "UGC Toison d'Or",
      movies: [
        {
          title: "Film 1 - Toison d'Or",
          director: "Director C",
        },
        {
          title: "Film 2 - Toison d'Or",
          director: "Director D",
        },
      ],
    },
  ];
  const pageTitle = "Informations sur les films dans les cinémas";
  return (
    <div>
      <PageTitle title={pageTitle} />

      {cinemas.map((cinema, index) => (
        <Cinema key={index} {...cinema} />
      ))}
    </div>
  );
};

export default App;
