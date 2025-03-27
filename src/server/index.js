import express from "express";
import cors from "cors";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

let moviesArr = [
  {
    id: 1,
    title: "Midnight In Paris",
    runtime: 96,
    release_year: 2011,
    director: "Woody Allen",
  },
  {
    id: 2,
    title: "Titanic",
    runtime: 210,
    release_year: 1997,
    director: "James Cameron",
  },
  {
    id: 3,
    title: "From Paris With Love",
    runtime: 94,
    release_year: 2010,
    director: "Pierre Morel",
  },
];

app.get("/", (req, res) => res.send("Hello World!"));

// Get all movies
app.get("/movies", (req, res) => {
  res.json(moviesArr);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
