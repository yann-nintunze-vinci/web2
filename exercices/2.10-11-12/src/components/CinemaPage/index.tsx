import Cinema from "./Cinema";

interface CinemaPageProps {
  children: React.ReactNode;
}

const CinemaPage = ({ children }: CinemaPageProps) => {
  return <div>{children}</div>;
};

const CinemaPageComp = () => {
  const cinemas = [
    {
      name: "UGC DeBrouckère",
      films: [
        {
          title: "HAIKYU-THE DUMPSTER BATTLE",
          director: "Susumu Mitsunaka",
          minutes: 150,
        },
        {
          title: "GOODBYE JULIA",
          director: "Mohamed Kordofani",
          minutes: 124,
        },
        {
          title: "INCEPTION",
          director: "Christopher Nolan",
          minutes: 139,
        },
        {
          title: "PARASITE",
          director: "Bong Joon-ho",
          minutes: 159,
        },
      ],
    },
    {
      name: "UGC Toison d'Or",
      films: [
        {
          title: "THE WATCHERS",
          director: "Ishana Night Shyamalan",
          minutes: 150,
        },
        {
          title: "BAD BOYS: RIDE OR DIE",
          director: "Adil El Arbi, Bilall Fallah",
          minutes: 124,
        },
        {
          title: "TENET",
          director: "Christopher Nolan",
          minutes: 139,
        },
        {
          title: "THE IRISHMAN",
          director: "Martin Scorsese",
          minutes: 159,
        },
      ],
    },
  ];

  return (
    <CinemaPage>
      <h2>Available movies on Cinema</h2>
      {cinemas.map((cinema, index) => (
        <Cinema key={index} {...cinema} />
      ))}
    </CinemaPage>
  );
};

export default CinemaPageComp;
