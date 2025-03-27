// knexfile.js
import dotenv from "dotenv";
dotenv.config();

/**
 * @type { import('knex').Knex.Config }
 */
const config = {
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

export default config;
