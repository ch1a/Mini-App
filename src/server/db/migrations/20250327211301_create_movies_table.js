export function up(knex) {
  return knex.schema.createTable("movies", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.integer("runtime");
    table.integer("release_year");
    table.string("director");
  });
}

export function down(knex) {
  return knex.schema.dropTable("movies");
}
