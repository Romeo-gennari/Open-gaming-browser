export default {
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  up: (knex) => {
    return knex.schema.createTable('is_in_preset', t => {
      t.integer('game_mode_id').primary().unsigned().references('game_mode.id');
      t.integer('player_id').primary().unsigned().references('player.id');
      t.integer('preset_id').primary().unsigned().references('preset.id');
    });
  },

  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  down: (knex) => {
    return knex.schema.dropTable('is_in_preset');
  },
};
