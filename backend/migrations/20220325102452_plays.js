/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable('plays', t => {
    t.integer('game_id').unsigned().references('game.id');
    t.integer('user_id').unsigned().references('user.id');
    t.integer('user_level');
    t.primary(['game_id', 'user_id']);
    t.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable('plays');
}
