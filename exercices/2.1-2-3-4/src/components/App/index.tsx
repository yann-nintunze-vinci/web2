import "./App.css";
import Header from "../Header";
import Cinema from "../Cinema";
import Footer from "../Footer";
import Main from "../Main";

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
      <Header title={pageTitle}>
        <img
          src="https://images.unsplash.com/photo-1603126004012-6b6715b9ed91?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </Header>
      <Main>
        {cinemas.map((cinema, index) => (
          <Cinema key={index} {...cinema} />
        ))}
      </Main>
      <Footer>
        <p>Blablabla</p>
      </Footer>
    </div>
  );
};

export default App;
