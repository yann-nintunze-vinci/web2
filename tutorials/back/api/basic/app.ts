import express, { ErrorRequestHandler } from "express";

import usersRouter from "./routes/users";
import pizzaRouter from "./routes/pizzas";
import drinkRouter from "./routes/drinks";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/pizzas", pizzaRouter);
app.use("/drinks", drinkRouter);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  return res.status(500).send("Something broke!");
};

let getRequestCount = 0;
let postRequestCount = 0;

app.use((req, _res, next) => {
  const url = req.originalUrl;

  switch (req.method) {
    case "GET":
      getRequestCount++;
      console.log("GET / : " + getRequestCount);
      switch (url) {
        case "/pizzas":
          console.log();
          break;
        case "/drinks":
          console.log();
          break;
        case "/users":
          console.log();
          break;
      }
      break;
    case "POST":
      postRequestCount++;
      console.log("POST / : " + postRequestCount);
      switch (url) {
        case "/pizzas":
          console.log();
          break;
        case "/drinks":
          console.log();
          break;
        case "/users":
          console.log();
          break;
      }
      next();
  }
});

app.use(errorHandler);

export default app;
