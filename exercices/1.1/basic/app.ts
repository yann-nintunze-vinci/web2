import express from "express";

import filmRouter from "./routes/films";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//1.2 + Bonus
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

app.use("/films", filmRouter);

export default app;
