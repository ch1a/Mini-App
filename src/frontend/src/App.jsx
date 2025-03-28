// import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

// const API = "localhost:8080/movies";

// function App() {
//   const [count, setCount] = useState(0);

//   // const getMovies = () => {
//   //   return [
//   //     { title: "Mean Girls" },
//   //     { title: "Hackers" },
//   //     { title: "The Grey" },
//   //     { title: "Sunshine" },
//   //     { title: "Ex Machina" },
//   //   ];
//   // };

//   // const movies = getMovies();
//   // console.log(movies);

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>

//       <div>
//         <h2>Movie List</h2>
//         <ul>
//           {movies.map((movie, index) => (
//             <li key={index}>{movie.title}</li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const API = "http://localhost:8080/movies";

function App() {
  const [count, setCount] = useState(0);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.error(err);
        setError("Error loading movies.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <div>
        <h2>Movie List</h2>

        {loading && <p>Loading movies...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                {movie.title} ({movie.release_year}) — {movie.director}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
