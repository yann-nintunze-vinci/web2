import { useEffect, useState } from "react";
import "./App.css";
import Joke from "../../type";
import RandomJoke from "../RandomJoke";

const defaultJoke: Joke = {
  category: "",
  joke: "",
};

function App() {
  const [joke, setJoke] = useState<Joke>(defaultJoke);

  const fetchJoke = () => {
    fetch("https://v2.jokeapi.dev/joke/Any?type=single")
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `fetch error : ${response.status} : ${response.statusText}`
          );
        return response.json();
      })
      .then((joke: Joke) => {
        setJoke(joke);
      })
      .catch((err) => {
        console.error("HomePage::error: ", err);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchJoke();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return <RandomJoke joke={joke} />;
}

export default App;
