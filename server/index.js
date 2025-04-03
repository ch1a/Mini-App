// import express from "express";
// import cors from "cors";
// import pkg from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// const { Pool } = pkg;

// console.log("DATABASE_URL:", process.env.DATABASE_URL);

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// const app = express();
// const port = 8080;

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => res.send("Hello World!"));

// app.get("/movies", async (req, res) => {
//   const result = await pool.query("SELECT * FROM movies ORDER BY id");
//   res.json(result.rows);
// });

// app.get("/test-db", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT NOW()");
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("DB error");
//   }
// });

// pool
//   .query("SELECT NOW()")
//   .then((res) => console.log("DB Connected:", res.rows[0]))
//   .catch((err) => console.error("DB Connection Error:", err));

// app.listen(port, () =>
//   console.log(`Example app listening at http://localhost:${port}`)
// );

// // // Delete a movie by ID
// // app.delete("/movies/:id", async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     await pool.query("DELETE FROM movies WHERE id = $1", [id]);
// //     res.sendStatus(204); // No content
// //   } catch (error) {
// //     console.error("Error deleting movie:", error);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // });

// // DELETE /movies/:id - Delete a movie by ID from the database
// app.delete("/movies/:id", async (req, res) => {
//   const movieId = req.params.id;

//   try {
//     const result = await pool.query(
//       "DELETE FROM movies WHERE id = $1 RETURNING *",
//       [movieId]
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({ error: "Movie not found" });
//     }

//     res.status(200).json({ message: "Movie deleted", movie: result.rows[0] });
//   } catch (err) {
//     console.error("Delete error:", err);
//     res.status(500).json({ error: "Failed to delete movie" });
//   }
// });

// // Update a movie title by ID
// app.put("/movies/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title } = req.body;
//     await pool.query("UPDATE movies SET title = $1 WHERE id = $2", [title, id]);
//     res.sendStatus(200);
//   } catch (error) {
//     console.error("Error updating movie:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // create username

// app.post("/users", async (req, res) => {
//   const { username } = req.body;

//   if (!username) {
//     return res.status(400).json({ error: "Username is required" });
//   }

//   try {
//     const result = await pool.query(
//       "INSERT INTO users (username) VALUES ($1) RETURNING *",
//       [username]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     if (err.code === "23505") {
//       // 23505 = unique_violation in PostgreSQL
//       return res.status(409).json({ error: "Username already exists" });
//     }

//     console.error("DB Error:", err);
//     res.status(500).json({ error: "Failed to create user" });
//   }
// });

// app.post("/movies", async (req, res) => {
//   const { title, runtime, release_year, director } = req.body;

//   try {
//     const result = await pool.query(
//       `INSERT INTO movies (title, runtime, release_year, director)
//        VALUES ($1, $2, $3, $4)
//        RETURNING *`,
//       [title, runtime, release_year, director]
//     );
//     res.status(201).json(result.rows[0]); // send back the new movie
//   } catch (err) {
//     console.error("Add movie error:", err);
//     res.status(500).json({ error: "Failed to add movie" });
//   }
// });

// // Favorites endpoint
// app.get("/favorites", async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT
//         movies.id, movies.title, movies.release_year, movies.director
//       FROM user_favorites
//       JOIN movies ON user_favorites.movie_id = movies.id
//       WHERE user_favorites.user_id = 1
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });

// app.post("/favorites", async (req, res) => {
//   const { user_id, movie_id } = req.body;

//   if (!user_id || !movie_id) {
//     return res.status(400).json({ error: "user_id and movie_id are required" });
//   }

//   try {
//     const result = await pool.query(
//       "INSERT INTO user_favorites (user_id, movie_id) VALUES ($1, $2) RETURNING *",
//       [user_id, movie_id]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     if (err.code === "23505") {
//       return res.status(409).json({ error: "Already a favorite" });
//     }

//     console.error("Add favorite error:", err);
//     res.status(500).json({ error: "Failed to add to favorites" });
//   }
// });

import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => res.send("Hello World!"));

// Confirm DB connection
pool
  .query("SELECT NOW()")
  .then((res) => console.log("DB Connected:", res.rows[0]))
  .catch((err) => console.error("DB Connection Error:", err));

/** ===============================
 *            MOVIES
 * =============================== */

// Get all movies
app.get("/movies", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM movies ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch movies error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new movie
// app.post("/movies", async (req, res) => {
//   const { title, runtime, release_year, director } = req.body;

//   try {
//     const result = await pool.query(
//       `INSERT INTO movies (title, runtime, release_year, director)
//        VALUES ($1, $2, $3, $4)
//        RETURNING *`,
//       [title, runtime, release_year, director]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error("Add movie error:", err);
//     res.status(500).json({ error: "Failed to add movie" });
//   }
// });

app.post("/movies", async (req, res) => {
  const {
    title,
    runtime,
    release_year,
    director,
    rated,
    released,
    genre,
    writer,
    actors,
    plot,
    language,
    country,
    awards,
    poster,
    imdb_rating,
    metascore,
    box_office,
    imdb_id,
    type,
  } = req.body;

  try {
    // Check if movie with same imdb_id exists
    const check = await pool.query("SELECT * FROM movies WHERE imdb_id = $1", [
      imdb_id,
    ]);
    if (check.rows.length > 0) {
      return res.status(409).json({ error: `"${movie.title}" already exists` });
    }

    const result = await pool.query(
      `INSERT INTO movies (
        title, runtime, release_year, director,
        rated, released, genre, writer, actors, plot,
        language, country, awards, poster,
        imdb_rating, metascore, box_office, imdb_id, type
      )
      VALUES (
        $1, $2, $3, $4,
        $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14,
        $15, $16, $17, $18, $19
      )
      RETURNING *`,
      [
        title,
        runtime,
        release_year,
        director,
        rated,
        released,
        genre,
        writer,
        actors,
        plot,
        language,
        country,
        awards,
        poster,
        imdb_rating,
        metascore,
        box_office,
        imdb_id,
        type,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      // PostgreSQL unique constraint violation
      return res
        .status(409)
        .json({ error: "Movie already exists in database" });
    }

    console.error("Add movie error:", err);
    res.status(500).json({ error: "Failed to add movie" });
  }
});

// Delete a movie
app.delete("/movies/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM movies WHERE id = $1 RETURNING *",
      [id]
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

// Update a movie title
app.put("/movies/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    await pool.query("UPDATE movies SET title = $1 WHERE id = $2", [title, id]);
    res.sendStatus(200);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update movie" });
  }
});

/** ===============================
 *            USERS
 * =============================== */

// Create user
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
      return res.status(409).json({ error: "Username already exists" });
    }
    console.error("Create user error:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

/** ===============================
 *          FAVORITES
 * =============================== */

// Get favorites for a user
app.get("/favorites/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT
         movies.id, movies.title, movies.release_year, movies.director
       FROM user_favorites
       JOIN movies ON user_favorites.movie_id = movies.id
       WHERE user_favorites.user_id = $1`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Get favorites error:", err);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

// Add to favorites
app.post("/favorites", async (req, res) => {
  const { user_id, movie_id } = req.body;

  if (!user_id || !movie_id) {
    return res.status(400).json({ error: "user_id and movie_id are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO user_favorites (user_id, movie_id) VALUES ($1, $2) RETURNING *",
      [user_id, movie_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Already a favorite" });
    }
    console.error("Add favorite error:", err);
    res.status(500).json({ error: "Failed to add to favorites" });
  }
});

// Remove from favorites
app.delete("/favorites", async (req, res) => {
  const { user_id, movie_id } = req.body;

  if (!user_id || !movie_id) {
    return res.status(400).json({ error: "user_id and movie_id are required" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM user_favorites WHERE user_id = $1 AND movie_id = $2",
      [user_id, movie_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    res.status(204).end();
  } catch (err) {
    console.error("Delete favorite error:", err);
    res.status(500).json({ error: "Failed to remove favorite" });
  }
});

/** ===============================
 *         START SERVER
 * =============================== */
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

// Get all users
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Favorites per user
app.get("/favorites/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT movies.id, movies.title, movies.release_year, movies.director
      FROM user_favorites
      JOIN movies ON user_favorites.movie_id = movies.id
      WHERE user_favorites.user_id = $1
    `,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/favorites/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const userResult = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = userResult.rows[0].id;

    const result = await pool.query(
      `
      SELECT movies.id, movies.title, movies.release_year, movies.director
      FROM user_favorites
      JOIN movies ON user_favorites.movie_id = movies.id
      WHERE user_favorites.user_id = $1
    `,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Favorites fetch error:", err);
    res.status(500).send("Server error");
  }
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username FROM users ORDER BY username"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to get users" });
  }
});

// Get movie by imdb_id
app.get("/movies/imdb/:imdb_id", async (req, res) => {
  const { imdb_id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM movies WHERE imdb_id = $1", [
      imdb_id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching movie by imdb_id:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/users", async (req, res) => {
  const { username } = req.body;
  // ...
});

// Check if movie exists by imdb_id
app.get("/movies/imdb/:imdb_id", async (req, res) => {
  const { imdb_id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM movies WHERE imdb_id = $1", [
      imdb_id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching movie by imdb_id:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/movies/imdb/:imdb_id", async (req, res) => {
  const { imdb_id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM movies WHERE imdb_id = $1", [
      imdb_id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Lookup error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
