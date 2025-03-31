exports.up = function (knex) {
  return knex.schema.createTable("movies", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("rated");
    table.string("released");
    table.integer("runtime");
    table.string("genre");
    table.string("director");
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
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("movies");
};
