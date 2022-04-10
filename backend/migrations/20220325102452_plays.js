export default {
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  up: (knex) => {
    return knex.schema.createTable('plays', t => {
      t.integer('game_id').primary().unsigned().references('game.id');
      t.integer('player_id').primary().unsigned().references('player.id');
      t.integer('player_level');
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
