import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const API = "localhost:8080/movies";

function App() {
  // const [count, setCount] = useState(0);

  // const getMovies = () => {
  //   return [
  //     { title: "Mean Girls" },
  //     { title: "Hackers" },
  //     { title: "The Grey" },
  //     { title: "Sunshine" },
  //     { title: "Ex Machina" },
  //   ];
  // };

  // const movies = getMovies();
  // console.log(movies);

  return (
    <>
      {/* <div>
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
   */}
      <div>
        <h2>Movie List</h2>
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>{movie.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
