import { useState, useEffect } from "react";
import "./MovieList.css";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" or "error"

  useEffect(() => {
    fetch("http://localhost:8080/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load movies:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (movie) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${movie.title}"?`
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8080/movies/${movie.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMovies((prev) => prev.filter((m) => m.id !== movie.id));
        setStatusMessage(`"${movie.title}" deleted successfully.`);
        setStatusType("success");
      } else {
        setStatusMessage(`Failed to delete "${movie.title}".`);
        setStatusType("error");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setStatusMessage(`Error deleting "${movie.title}".`);
      setStatusType("error");
    }

    setTimeout(() => {
      setStatusMessage("");
      setStatusType("");
    }, 3000);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movie-list" style={{ padding: "1rem" }}>
      <h2>All Movies</h2>

      <input
        type="text"
        placeholder="Filter movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "0.5rem",
          width: "250px",
          marginBottom: "1rem",
          border: "1px solid #ccc",
        }}
      />

      {loading ? (
        <p>Loading...</p>
      ) : filteredMovies.length > 0 ? (
        <ul>
          {filteredMovies.map((movie) => (
            <li key={movie.id} style={{ marginBottom: "0.5rem" }}>
              {movie.title} ({movie.release_year}) — {movie.director}{" "}
              <button
                onClick={() => handleDelete(movie)}
                style={{
                  marginLeft: "1rem",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies match your search.</p>
      )}

      {/* Floating message */}
      {statusMessage && (
        <div className="statusMessage">
          <p className={statusType === "error" ? "error" : "success"}>
            {statusMessage}
          </p>
        </div>
      )}
    </div>
  );
}

export default MovieList;
