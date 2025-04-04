// exports.up = function (knex) {
//   return knex.schema.createTable("movies", (table) => {
//     table.increments("id").primary();
//     table.string("title").notNullable();
//     table.integer("runtime");
//     table.integer("release_year");
//     table.string("director");
//   });
// };

// exports.down = function (knex) {
//   return knex.schema.dropTableIfExists("movies");
// };

// server/db/migrations/20250331_create_movies_table.cjs

exports.up = function (knex) {
  return knex.schema.createTable("movies", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.integer("runtime");
    table.integer("release_year");
    table.string("director");
    table.string("rated");
    table.string("released");
    table.string("genre");
    table.text("writer");
    table.text("actors");
    table.text("plot");
    table.string("language");
    table.string("country");
    table.string("awards");
    table.string("poster");
    table.string("imdb_rating");
    table.string("metascore");
    table.string("box_office");
    table.string("imdb_id").unique();
    table.string("type");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("movies");
};
