// import dotenv from "dotenv";

// // dotenv.config();

// const path = require("path");
// const dotenv = require("dotenv");
const path = require("path");
const dotenv = require("dotenv");

// Try loading from custom path
dotenv.config({ path: "/app_data/.env" });

// If critical vars are missing, fallback to local .env
const requiredEnv = [
  "USER_PASSWORD",
  "USER_NAME",
  "DATABASE_PORT",
  "DATABASE_NAME",
];
const isMissing = requiredEnv.some((key) => !process.env[key]);

if (isMissing) {
  dotenv.config({ path: path.resolve(__dirname, "./.env") });
}

module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
    },
    migrations: {
      directory: "./src/server/db/migrations",
    },
    seeds: {
      directory: "./src/server/db/seeds",
    },
  },
  staging: {
    client: "pg",
    connection: {
      connectionString: process.env.STAGING_DATABASE_URL,
    },
    pool: { min: 2, max: 10 },
    migrations: { tableName: "knex_migrations" },
  },
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
    },
    pool: { min: 2, max: 10 },
    migrations: { tableName: "knex_migrations" },
  },
};
