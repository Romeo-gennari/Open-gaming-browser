/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable('session_composed_of', t => {
    t.integer('user_id').unsigned().references('user.id');
    t.integer('preset_id').unsigned().references('preset.id');
    t.integer('game_mode_id').unsigned().references('game_mode.id');
    t.primary(['user_id', 'preset_id', 'game_mode_id']);
    t.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable('session_composed_of');
}
