import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "../Footer";
import Header from "../Header";
import {
  Drink,
  NewPizza,
  Pizza,
  PizzeriaContext,
  MaybeAuthenticatedUser,
  User,
  AuthenticatedUser,
} from "../../types";
import {
  storeAuthenticatedUser,
  getAuthenticatedUser,
  clearAuthenticatedUser,
} from "../../utils/session";
import NavBar from "../Navbar";

const drinks: Drink[] = [
  {
    title: "Coca-Cola",
    image:
      "https://media.istockphoto.com/id/1289738725/fr/photo/bouteille-en-plastique-de-coke-avec-la-conception-et-le-chapeau-rouges-d%C3%A9tiquette.jpg?s=1024x1024&w=is&k=20&c=HBWfROrGDTIgD6fuvTlUq6SrwWqIC35-gceDSJ8TTP8=",
    volume: "Volume: 33cl",
    price: "2,50 €",
  },
  {
    title: "Pepsi",
    image:
      "https://media.istockphoto.com/id/185268840/fr/photo/bouteille-de-cola-sur-un-fond-blanc.jpg?s=1024x1024&w=is&k=20&c=xdsxwb4bLjzuQbkT_XvVLyBZyW36GD97T1PCW0MZ4vg=",
    volume: "Volume: 33cl",
    price: "2,50 €",
  },
  {
    title: "Eau Minérale",
    image:
      "https://media.istockphoto.com/id/1397515626/fr/photo/verre-deau-gazeuse-%C3%A0-boire-isol%C3%A9.jpg?s=1024x1024&w=is&k=20&c=iEjq6OL86Li4eDG5YGO59d1O3Ga1iMVc_Kj5oeIfAqk=",
    volume: "Volume: 50cl",
    price: "1,50 €",
  },
];

const App = () => {
  const [actionToBePerformed, setActionToBePerformed] = useState(false);
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [authenticatedUser, setAuthenticatedUser] =
    useState<MaybeAuthenticatedUser>(undefined);

  useEffect(() => {
    fetchPizzas();
    const authenticatedUser = getAuthenticatedUser();
    if (authenticatedUser) {
      setAuthenticatedUser(authenticatedUser);
    }
  }, []);

  const fetchPizzas = async () => {
    try {
      const pizzas = await getAllPizzas();
      setPizzas(pizzas);
    } catch (err) {
      console.error("HomePage::error: ", err);
    }
  };

  async function getAllPizzas() {
    try {
      const response = await fetch("/api/pizzas");

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const pizzas = await response.json();
      return pizzas;
    } catch (err) {
      console.error("getAllPizzas::error: ", err);
      throw err;
    }
  }

  const addPizza = async (newPizza: NewPizza) => {
    try {
      if (!authenticatedUser) {
        throw new Error("You must be authenticated to add a pizza");
      }
      const options = {
        method: "POST",
        body: JSON.stringify(newPizza),
        headers: {
          "Content-Type": "application/json",
          Authorization: authenticatedUser.token,
        },
      };

      const response = await fetch("/api/pizzas", options);

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const createdPizza = await response.json();

      setPizzas([...pizzas, createdPizza]);
    } catch (err) {
      console.error("AddPizzaPage::error: ", err);
    }
  };

  const handleHeaderClick = () => {
    setActionToBePerformed(true);
  };

  const clearActionToBePerformed = () => {
    setActionToBePerformed(false);
  };

  const registerUser = async (newUser: User) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/auths/register", options);

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const createdUser: AuthenticatedUser = await response.json();

      setAuthenticatedUser(createdUser);
    } catch (err) {
      console.error("registerUser::error: ", err);
      throw err;
    }
  };

  const loginUser = async (user: User) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/auths/login", options);

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const authenticatedUser: AuthenticatedUser = await response.json();
      console.log("authenticatedUser: ", authenticatedUser);

      setAuthenticatedUser(authenticatedUser);
      storeAuthenticatedUser(authenticatedUser);
    } catch (err) {
      console.error("loginUser::error: ", err);
      throw err;
    }
  };

  const clearUser = () => {
    clearAuthenticatedUser();
    setAuthenticatedUser(undefined);
  };

  const fullPizzaContext: PizzeriaContext = {
    addPizza,
    pizzas,
    setPizzas,
    actionToBePerformed,
    setActionToBePerformed,
    clearActionToBePerformed,
    drinks,
    registerUser,
    loginUser,
  };

  return (
    <div className="page">
      <Header
        authenticatedUser={authenticatedUser}
        title="We love Pizza"
        handleHeaderClick={handleHeaderClick}
      />
      <main>
        <NavBar authenticatedUser={authenticatedUser} clearUser={clearUser} />
        <Outlet context={fullPizzaContext} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
