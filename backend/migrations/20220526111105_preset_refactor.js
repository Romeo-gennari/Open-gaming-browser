/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema
    .alterTable('preset', t => {
      t.dropUnique('name');
      t.dropIndex('name');
      t.enum('type', ['default', 'classic', 'temporary']).alter();
      t.integer('user_id').unsigned().references('user.id');
    })
    .alterTable('is_in_preset', t => {
      t.dropForeign('user_id');
      t.dropColumn('user_id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema
    .alterTable('preset', t => {
      t.unique('name');
      t.index('name');
      t.dropColumn('type');
      t.string('type').alter();
      t.dropColumn('user_id');
    })
    .alterTable('is_in_preset', t => {
      t.integer('user_id').unsigned().references('user.id');
    });
};
