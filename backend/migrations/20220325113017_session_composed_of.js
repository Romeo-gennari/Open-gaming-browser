export default {
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  up: (knex) => {
    return knex.schema.createTable('session_composed_of', t => {
      t.integer('player_id').primary().unsigned().references('player.id');
      t.integer('preset_id').primary().unsigned().references('preset.id');
      t.integer('game_mode_id').primary().unsigned().references('game_mode.id');
    });
  },

  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  down: (knex) => {
    return knex.schema.dropTable('session_composed_of');
  },
};
