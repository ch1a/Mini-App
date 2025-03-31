/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Clear existing favorites
  await knex("user_favorites").del();

  // Insert test favorites (assuming movie & user IDs exist)
  await knex("user_favorites").insert([
    { user_id: 1, movie_id: 1 },
    { user_id: 1, movie_id: 2 },
    { user_id: 2, movie_id: 2 },
    { user_id: 2, movie_id: 3 },
  ]);
}
