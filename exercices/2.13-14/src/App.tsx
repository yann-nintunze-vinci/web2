import { useEffect, useState } from "react";
import "./App.css";

interface Joke {
  category: string;
  joke: string;
}

function App() {
  const [joke, setJoke] = useState<Joke | null>(null);

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
    fetchJoke();
  }, []);

  return (
    <div>
      {joke && (
        <div onClick={fetchJoke}>
          <p>{joke.category}</p>
          <p>{joke.joke}</p>
        </div>
      )}
    </div>
  );
}

export default App;
