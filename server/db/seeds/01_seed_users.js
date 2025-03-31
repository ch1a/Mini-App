/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("users").del();

  await knex("users").insert([
    { id: 1, username: "cam" },
    { id: 2, username: "Tani" },
  ]);
}
