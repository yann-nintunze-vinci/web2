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
          description:
            "A high-energy sports anime movie focusing on the intense volleyball rivalry between Karasuno High and their fierce competitors.",
        },
        {
          title: "GOODBYE JULIA",
          director: "Mohamed Kordofani",
          description:
            "A poignant drama that explores themes of love, loss, and the complex dynamics of human relationships in a deeply emotional narrative.",
        },
        {
          title: "INCEPTION",
          director: "Christopher Nolan",
          description:
            "A mind-bending sci-fi thriller where a skilled thief, who enters people's dreams to steal secrets, is given a chance to have his criminal record erased if he can implant an idea into a target's subconscious.",
        },
        {
          title: "PARASITE",
          director: "Bong Joon-ho",
          description:
            "An Oscar-winning dark comedy thriller that examines class disparities through the story of two families — one wealthy, the other destitute — and their increasingly complicated relationship.",
        },
      ],
    },
    {
      name: "UGC Toison d'Or",
      movies: [
        {
          title: "THE WATCHERS",
          director: "Ishana Night Shyamalan",
          description:
            "A suspenseful thriller that follows a group of people who are under constant surveillance, leading them to uncover dark secrets about their observers and themselves.",
        },
        {
          title: "BAD BOYS: RIDE OR DIE",
          director: "Adil El Arbi, Bilall Fallah",
          description:
            "The latest installment in the action-packed Bad Boys franchise, featuring detectives Mike Lowrey and Marcus Burnett as they take on their most dangerous case yet.",
        },
        {
          title: "TENET",
          director: "Christopher Nolan",
          description:
            "A complex and visually stunning sci-fi action film where a protagonist embarks on a time-bending mission to prevent World War III, navigating through a world of temporal inversion.",
        },
        {
          title: "THE IRISHMAN",
          director: "Martin Scorsese",
          description:
            "An epic crime drama that chronicles the life of Frank Sheeran, a mob hitman, as he reflects on his involvement with the Bufalino crime family and the mysterious disappearance of his friend, Jimmy Hoffa.",
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
        <p>This is the footer </p>
      </Footer>
    </div>
  );
};

export default App;
