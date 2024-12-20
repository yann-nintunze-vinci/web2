import { Request } from "express";

interface Pizza {
  id: number;
  title: string;
  content: string;
}

interface PizzaToUpdate {
  title?: string;
  content?: string;
}

type NewPizza = Omit<Pizza, "id">;

interface Drink {
  id: number;
  title: string;
  image: string;
  volume: number;
  price: number;
}

type NewDrink = Omit<Drink, "id">;

interface User {
  username: string;
  password: string;
}

interface AuthenticatedUser {
  username: string;
  token: string;
}

interface JwtPayload {
  username: string;
  exp: number;
  iat: number;
}

interface AuthenticatedRequest extends Request {
  user?: User;
}

export type { Pizza, NewPizza, PizzaToUpdate, Drink, NewDrink, User, AuthenticatedUser, JwtPayload, AuthenticatedRequest };
