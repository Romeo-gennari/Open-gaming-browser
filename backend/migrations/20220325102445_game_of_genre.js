/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('game_of_genre', t => {
    t.integer('game_id').unsigned().references('game.id');
    t.integer('genre_id').unsigned().references('genre.id');
    t.primary(['game_id', 'genre_id']);
    t.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('game_of_genre');
}
