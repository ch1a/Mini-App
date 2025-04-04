import { useState, useEffect } from "react";
import "./Home.css";
function Home({ selectedUser, setSelectedUser }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [omdbResults, setOmdbResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [showCreateUser, setShowCreateUser] = useState(false);

  const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  console.log("Loaded OMDB API Key:", OMDB_API_KEY);
  console.log("Loaded OMDB API Key:", import.meta.env.VITE_OMDB_API_KEY);

  // const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  // console.log("Loaded OMDB API Key:", OMDB_API_KEY);

  if (!OMDB_API_KEY) {
    console.error("❌ OMDB API key not loaded. Check .env and Vite config.");
  }
  console.log("OMDB_API_KEY loaded?", OMDB_API_KEY);

  // const OMDB_API_KEY = "API_KEY"; // INSERT API KEY, (WILL CONVERT TO DOTENV)

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Failed to load users", err));
  }, []);

  useEffect(() => {
    if (!searchTerm || !selectedUser) return;

    fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setOmdbResults(data.Search || []));
  }, [searchTerm, selectedUser]);

  const showStatusMessage = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(""), 2500);
  };

  const handleAddUser = async () => {
    if (!newUsername) return;

    try {
      const res = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newUsername }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create user");
        return;
      }

      setUsers([...users, data]);
      setSelectedUser(data.id);
      setNewUsername("");
      setError("");
      setStatusMessage(`User "${data.username}" created`);
      setShowCreateUser(false);
    } catch (err) {
      console.error(err);
      setError("Error creating user");
    }

    setTimeout(() => {
      setError("");
      setStatusMessage("");
    }, 2500);
  };

  const fetchFullMovieDetails = async (imdbID) => {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbID}`
    );
    return await res.json();
  };

  const addMovieToDB = async (omdbMovie) => {
    if (!selectedUser) {
      showStatusMessage("⚠️ Please select a user first.");
      return;
    }

    try {
      const fullData = await fetchFullMovieDetails(omdbMovie.imdbID);

      const response = await fetch("http://localhost:8080/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: fullData.Title,
          runtime: parseInt(fullData.Runtime),
          release_year: parseInt(fullData.Year),
          director: fullData.Director,
          rated: fullData.Rated,
          released: fullData.Released,
          genre: fullData.Genre,
          writer: fullData.Writer,
          actors: fullData.Actors,
          plot: fullData.Plot,
          language: fullData.Language,
          country: fullData.Country,
          awards: fullData.Awards,
          poster: fullData.Poster,
          imdb_rating: fullData.imdbRating,
          metascore: fullData.Metascore,
          box_office: fullData.BoxOffice,
          imdb_id: fullData.imdbID,
          type: fullData.Type,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Ops, it seems like ${fullData.Title} is already in the database.`
        );
      }

      const movie = await response.json();
      showStatusMessage(`"${movie.title}" added to the database.`);
    } catch (err) {
      console.error(err);
      showStatusMessage(`${err.message}`);
    }
  };

  const addToFavorites = async (omdbMovie) => {
    if (!selectedUser) {
      showStatusMessage("⚠️ Please select a user.");
      return;
    }

    try {
      const check = await fetch(
        `http://localhost:8080/movies/imdb/${omdbMovie.imdbID}`
      );
      const movie = await check.json();

      if (!movie?.id) {
        showStatusMessage(
          `⚠️ "${omdbMovie.Title}" not found in DB. Add to DB first.`
        );
        return;
      }

      const res = await fetch("http://localhost:8080/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: selectedUser,
          movie_id: movie.id,
        }),
      });

      if (res.status === 409) {
        showStatusMessage(`💾 "${movie.title}" is already in favorites.`);
      } else if (res.ok) {
        showStatusMessage(`❤️ Added "${movie.title}" to favorites!`);
      } else {
        showStatusMessage(`❌ Failed to add "${movie.title}" to favorites.`);
      }
    } catch (err) {
      console.error(err);
      showStatusMessage("❌ Error adding to favorites.");
    }
  };

  return (
    <div className="home-container">
      <div className="search-header">
        <h2>OMDB Search + Add to Favorites</h2>

        <div className="user-select-container">
          <label>Select User:</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">-- Choose a user --</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowCreateUser((prev) => !prev)}
            className="create-user-btn"
            aria-label="Create new user"
            title="Create new user"
          >
            {showCreateUser ? "–" : "+"}
          </button>
        </div>

        {showCreateUser && (
          <div className="create-user-input">
            <input
              type="text"
              placeholder="New username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button onClick={handleAddUser}>Create User</button>
          </div>
        )}

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search OMDb..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (!selectedUser) {
                setError("⚠️ Select a user to begin searching.");
                setTimeout(() => setError(""), 2500);
              }
            }}
            className={`search-input ${selectedUser ? "" : "error-border"}`}
          />
        </div>
      </div>

      {(error || statusMessage) && (
        <div className="statusMessage">
          {error && <p className="error">{error}</p>}
          {statusMessage && <p className="success">{statusMessage}</p>}
        </div>
      )}

      <div className="results">
        {omdbResults.map((movie) => (
          <div className="movie-card" key={movie.imdbID}>
            <strong>
              {movie.Title} ({movie.Year})
            </strong>
            <div>
              <img src={movie.Poster} alt={movie.Title} width="100" />
            </div>
            <button onClick={() => addMovieToDB(movie)}>➕ Add to DB</button>{" "}
            <button onClick={() => addToFavorites(movie)}>
              ❤️ Add to Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
