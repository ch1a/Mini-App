import { Routes, Route, Link } from "react-router-dom";
import MovieList from "./MovieList";
import Favorites from "./Favorites";
import Home from "./Home"; // or use App itself for search
import "./App.css";

function App() {
  return (
    <>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/movies" style={linkStyle}>
          All Movies
        </Link>
        <Link to="/favorites" style={linkStyle}>
          Favorites
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

const navStyle = {
  display: "flex",
  gap: "1rem",
  padding: "1rem",
  backgroundColor: "#222",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

export default App;
