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
  const [action, setAction] = useState<boolean>(false);

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
    const interval = setInterval(() => {
      if (action) {
        clearInterval(interval);
      } else {
        fetchDog();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [action]);

  return (
    <div>
      {dog.status === "success" && (
        <RandomDog
          ActionOnMouseEnter={() => setAction(true)}
          ActionOnMouseLeave={() => setAction(false)}
          dog={dog}
        />
      )}
      <p>{action ? "true" : "false"}</p>
    </div>
  );
};

export default App;
