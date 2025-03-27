import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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

// Get all movies from PostgreSQL
app.get("/movies", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM movies ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});

pool
  .query("SELECT NOW()")
  .then((res) => console.log("DB Connected:", res.rows[0]))
  .catch((err) => console.error("DB Connection Error:", err));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
