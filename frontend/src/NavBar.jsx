// src/components/NavBar.jsx
import { Link } from "react-router-dom";
import "./NavBar.css"; // optional for styling

function NavBar() {
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/favorites">Favorites</Link>
    </nav>
  );
}

export default NavBar;
