import { useState, useEffect } from "react";

function Favorites() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all users on mount
  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.error("Failed to fetch users", err);
        setError("Error loading users.");
      });
  }, []);

  // Fetch favorites when user is selected
  useEffect(() => {
    if (!selectedUserId) return;

    setLoading(true);
    fetch(`http://localhost:8080/favorites/${selectedUserId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch favorites");
        return res.json();
      })
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading favorites.");
        setLoading(false);
      });
  }, [selectedUserId]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>User Favorites</h2>

      <label htmlFor="user-select">Select a user: </label>
      <select
        id="user-select"
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="">-- Select User --</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && favorites.length === 0 && selectedUserId && (
        <p>No favorites for this user yet.</p>
      )}

      {!loading && favorites.length > 0 && (
        <ul style={{ marginTop: "1rem" }}>
          {favorites.map((movie) => (
            <li key={movie.id}>
              {movie.title} ({movie.release_year}) — {movie.director}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;
