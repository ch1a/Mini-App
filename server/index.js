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

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/movies", async (req, res) => {
  const result = await pool.query("SELECT * FROM movies ORDER BY id");
  res.json(result.rows);
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

// // Delete a movie by ID
// app.delete("/movies/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await pool.query("DELETE FROM movies WHERE id = $1", [id]);
//     res.sendStatus(204); // No content
//   } catch (error) {
//     console.error("Error deleting movie:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// DELETE /movies/:id - Delete a movie by ID from the database
app.delete("/movies/:id", async (req, res) => {
  const movieId = req.params.id;

  try {
    const result = await pool.query(
      "DELETE FROM movies WHERE id = $1 RETURNING *",
      [movieId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted", movie: result.rows[0] });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete movie" });
  }
});

// Update a movie title by ID
app.put("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    await pool.query("UPDATE movies SET title = $1 WHERE id = $2", [title, id]);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// create username

app.post("/users", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO users (username) VALUES ($1) RETURNING *",
      [username]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      // 23505 = unique_violation in PostgreSQL
      return res.status(409).json({ error: "Username already exists" });
    }

    console.error("DB Error:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});
