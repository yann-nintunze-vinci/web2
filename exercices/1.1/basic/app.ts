import express from "express";

import filmRouter from "./routes/films";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/films", filmRouter);

let getRequestCount = 0;

app.use((req, _res, next) => {
    if (req.method === "GET") {
        getRequestCount++;
        console.log("GET / : " + getRequestCount);
    }
    next();
});

export default app;
