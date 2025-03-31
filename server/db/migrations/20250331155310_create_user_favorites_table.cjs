exports.up = function (knex) {
  return knex.schema.createTable("user_favorites", (table) => {
    table.integer("user_id").unsigned().notNullable();
    table.integer("movie_id").unsigned().notNullable();

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table
      .foreign("movie_id")
      .references("id")
      .inTable("movies")
      .onDelete("CASCADE");

    table.primary(["user_id", "movie_id"]); // prevent duplicates
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_favorites");
};
