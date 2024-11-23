import { useState, useEffect } from "react";
import "./App.css";

interface Dog {
  message: string;
  status: string;
}

function App() {
  const defaultDog: Dog = {
    message: "",
    status: "",
  };
  const [dog, setDog] = useState<Dog>(defaultDog);

  const fetchDog = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `fetch error : ${response.status} : ${response.statusText}`
          );
        return response.json();
      })
      .then((dog: Dog) => {
        setDog(dog);
      })
      .catch((err) => {
        console.error("HomePage::error: ", err);
      });
  };

  useEffect(() => {
    fetchDog();
  }, []);

  interface RandomDogProps {
    dog: Dog;
    fetchDog: () => void;
  }

  const RandomDog = ({ dog, fetchDog }: RandomDogProps) => {
    return <img onClick={fetchDog} src={dog.message} alt="Dog" />;
  };

  return (
    <div>
      {dog.status === "success" && <RandomDog dog={dog} fetchDog={fetchDog} />}
    </div>
  );
}

export default App;
