/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema
    .alterTable('game_mode', t => {
      t.dropUnique('name');
      t.dropIndex('name');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema
    .alterTable('game_mode', t => {
      t.unique('name');
      t.index('name');
    });
};
