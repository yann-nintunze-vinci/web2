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

  const fetchDog = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const dog: Dog = await response.json();
      setDog(dog);
    } catch (err) {
      console.error("HomePage::error: ", err);
    }
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
