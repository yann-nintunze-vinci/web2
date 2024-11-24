import { useState, useEffect } from "react";
import "./App.css";
import Dog from "../../type";
import RandomDog from "../RandomDog";

const defaultDog: Dog = {
  message: "",
  status: "",
};

const App = () => {
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

  return (
    <div>
      {dog.status === "success" && <RandomDog dog={dog} fetchDog={fetchDog} />}
    </div>
  );
};

export default App;
