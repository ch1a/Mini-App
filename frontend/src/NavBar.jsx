import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="nav">
      <NavLink
        to="/"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Movies
      </NavLink>
      <NavLink
        to="/favorites"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Favorites
      </NavLink>
    </nav>
  );
}

export default NavBar;
