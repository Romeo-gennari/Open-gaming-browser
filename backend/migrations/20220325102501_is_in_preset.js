/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('is_in_preset', t => {
    t.integer('game_mode_id').unsigned().references('game_mode.id');
    t.integer('user_id').unsigned().references('user.id');
    t.integer('preset_id').unsigned().references('preset.id');
    t.primary(['game_mode_id', 'user_id', 'preset_id']);
    t.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('is_in_preset');
}
