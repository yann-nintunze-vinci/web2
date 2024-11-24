import Joke from "../../type";

interface RandomJokeProps {
  joke: Joke;
}

const RandomJoke = ({ joke }: RandomJokeProps) => {
  return (
    <div>
      <p>{joke.category}</p>
      <p>{joke.joke}</p>
    </div>
  );
};

export default RandomJoke;
