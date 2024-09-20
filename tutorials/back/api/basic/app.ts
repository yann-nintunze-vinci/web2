import express, { ErrorRequestHandler } from "express";

import usersRouter from "./routes/users";
import pizzaRouter from "./routes/pizzas";
import drinkRouter from "./routes/drinks";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Bonus
const requestCounts: { [key: string]: { [key: string]: number } } = {
  GET: {},
  POST: {},
  PUT: {},
  DELETE: {}
};

app.use((req, _res, next) => {
  const url = req.originalUrl;
  const method = req.method;
  if (!requestCounts[method]) {
    requestCounts[method] = {};
  }
  if (!requestCounts[method][url]) {
    requestCounts[method][url] = 0;
  }
  requestCounts[method][url]++;
  console.log(`${method} ${url} : ${requestCounts[method][url]}`);
  next();
});

app.use("/users", usersRouter);
app.use("/pizzas", pizzaRouter);
app.use("/drinks", drinkRouter);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  return res.status(500).send("Something broke!");
};

app.use(errorHandler);

export default app;
