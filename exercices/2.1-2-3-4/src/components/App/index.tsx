import "./App.css";
import PageTitle from "../PageTitle";
import Cinema from "../Cinema";

const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";
  const cinemas = [
    {
      name: "UGC DeBrouckère",
      movies: [
        {
          title: "HAIKYU-THE DUMPSTER BATTLE",
          director: "Susumu Mitsunaka",
        },
        {
          title: "GOODBYE JULIA",
          director: "Mohamed Kordofani",
        },
        {
          title: "INCEPTION",
          director: "Christopher Nolan",
        },
        {
          title: "PARASITE",
          director: "Bong Joon-ho",
        },
      ],
    },
    {
      name: "UGC Toison d'Or",
      movies: [
        {
          title: "THE WATCHERS",
          director: "Ishana Night Shyamalan",
        },
        {
          title: "BAD BOYS: RIDE OR DIE",
          director: "Adil El Arbi, Bilall Fallah",
        },
        {
          title: "TENET",
          director: "Christopher Nolan",
        },
        {
          title: "THE IRISHMAN",
          director: "Martin Scorsese",
        },
      ],
    },
  ];

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
