# 🎬 Mini-App

A full-stack movie tracker app built with **Vite + React** on the frontend and **Express + PostgreSQL** on the backend. Users can search for movies using the OMDb API, store them in a local database, and manage their favorites.

---

## 📦 Features

- 🔍 Search movies via the OMDb API
- 🧑 Create/select users
- 💾 Add movies to local PostgreSQL database
- ❤️ Add/remove movies from favorites
- 🌙 Light/Dark mode toggle
- 🗃️ Persistent state using `localStorage`

---

## 📁 Project Structure

```
Mini-App/
├── frontend/         # React + Vite frontend
│   ├── src/
│   ├── .env          # Frontend environment variables
│   └── vite.config.js
│
├── server/           # Express + PostgreSQL backend
│   ├── db/
│   ├── .env          # Backend environment variables
│   └── index.js
│
├── package.json      # Backend project file
├── knexfile.cjs
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/mini-app.git
cd mini-app
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create `server/.env`:

```
DATABASE_URL=postgres://your_user:your_password@localhost:5432/your_db_name
```

Run the backend:

```bash
npm run server
```

> Make sure your PostgreSQL service is running and a database exists with the given name.

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `frontend/.env`:

```
VITE_OMDB_API_KEY=your_omdb_api_key_here
```

Run the frontend:

```bash
npm run dev
```

The app should now be available at: [http://localhost:5173](http://localhost:5173)

---

## 🧪 API Endpoints

### 🎬 Movies
- `GET /movies` – Show all movies.
- `GET /movies/imdb/:imdb_id` – Get movie by IMDb ID.
- `POST /movies` – Add a movie to the DB.
- `DELETE /movies/:id` – Delete a movie.

### 👤 Users
- `GET /users` – Show all users.
- `POST /users` – Create a new user.

### ❤️ Favorites
- `GET /users/:id/favorites` – Get a user's favorite movies.
- `POST /users/:id/favorites` – Add a movie to favorites.
- `DELETE /users/:id/favorites/:movie_id` – Remove a movie from favorites.

---

## 🛠️ Common Issues

### ❌ OMDb API key not loaded
- Ensure you have a valid `VITE_OMDB_API_KEY` inside `frontend/.env`
- Restart Vite dev server after modifying `.env`

### ❌ PostgreSQL connection error (e.g., SCRAM error)
- Ensure `DATABASE_URL` is correctly set and all values are strings.
- Confirm your PostgreSQL instance is running.

### ❌ Port conflicts
- The frontend runs on `5173+` and the backend on `8080`. Make sure these ports are not already used.

---

## 📃 License

MIT © 2025 Your Name