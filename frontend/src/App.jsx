import { useState, useEffect } from "react";
import "./App.css";

const API = "http://localhost:8080/movies";

function App() {
  const [count, setCount] = useState(0);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch movies");
        return res.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Error loading movies.");
        setLoading(false);
      });
  }, []);

  const deleteMovie = async (id) => {
    try {
      await fetch(`http://localhost:8080/movies/${id}`, {
        method: "DELETE",
      });

      // Remove it from state
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="app-container">
        <div className="centered-box">
          <div className="header">
            <h1>Movie List</h1>

            {/* 🔍 Search Bar */}
            <div className="search-bar" style={{ marginBottom: "1rem" }}>
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: "0.5rem",
                  fontSize: "1rem",
                  width: "250px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          </div>
          <div className="movie-list">
            {/* 🔄 Loading / Error / Movies */}
            {loading && <p>Loading movies...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && (
              <>
                {filteredMovies.length > 0 ? (
                  <ul>
                    {filteredMovies.map((movie) => (
                      <li key={movie.id}>
                        {movie.title} ({movie.release_year}) — {movie.director}{" "}
                        <button
                          className="delete"
                          onClick={() => deleteMovie(movie.id)}
                        >
                          🗑
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No movies match your search.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

await fetch("http://localhost:8080/movies", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Interstellar",
    runtime: 169,
    release_year: 2014,
    director: "Christopher Nolan",
  }),
});

export default App;
