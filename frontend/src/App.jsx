import { Routes, Route, Link } from "react-router-dom";
import MovieList from "./MovieList";
import Favorites from "./Favorites";
import Home from "./Home";
import NavBar from "./NavBar";
import "./App.css";

const [selectedUser, setSelectedUser] = useState("");

function App() {
  return (
    <>
      <NavBar />
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
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
