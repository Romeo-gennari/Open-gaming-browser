export default {
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  up: (knex) => {
    return knex.schema.createTable('game_of_genre', t => {
      t.integer('game_id').primary().unsigned().references('game.id');
      t.integer('genre_id').primary().unsigned().references('genre.id');
    });
  },

  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  down: (knex) => {
    return knex.schema.dropTable('game_of_genre');
  },
};
