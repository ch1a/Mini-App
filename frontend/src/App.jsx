// App.jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MovieList from "./MovieList";
import Favorites from "./Favorites";
import Home from "./Home";
import NavBar from "./NavBar";
import "./App.css";

function App() {
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <>
      <NavBar />
      <div className="app-wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            }
          />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
