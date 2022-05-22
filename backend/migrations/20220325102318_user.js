/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable('user', t => {
    t.increments('id').primary().unsigned();
    t.string('email').unique();
    t.string('username');
    t.string('password');
    t.string('avatar_url');
    t.string('description');
    t.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable('user');
};
