import "./App.css";
import Personne from "../Personne";
import Title from "../Title";
import Footer from "../Footer";

const App = () => {
  const personnes = [
    {
      name: "Alice",
      age: 25,
      isOnline: false
    },
    {
      name: "Bob",
      age: 30,
      isOnline: true
    },
    {
      name: "Charlie",
      age: 35,
      isOnline: true
    },
  ];
  const footerText = "© 2023 My App";
  const title = "Welcome to My App";

  return (
    <div>
      <Title title={title}/>
      {personnes.map((personne, index) => (
        <Personne key={index} {... personne} />
      ))}
      <Footer text={footerText} />
    </div>
  );
};

export default App;
