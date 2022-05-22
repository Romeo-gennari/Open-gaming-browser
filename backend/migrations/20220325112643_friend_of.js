/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable('friend_of', t => {
    t.integer('user1_id').unsigned().references('user.id');
    t.integer('user2_id').unsigned().references('user.id');
    t.string('friend_group');
    t.primary(['user1_id', 'user2_id']);
    t.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable('friend_of');
}
