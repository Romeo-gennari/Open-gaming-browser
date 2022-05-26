/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable('game', t => {
    t.increments('id').primary().unsigned();
    t.string('name').unique().index();
    t.date('release_date');
    t.string('description');
    t.integer('editor_id').unsigned().references('editor.id');
    t.integer('publisher_id').unsigned().references('publisher.id');
    t.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable('game');
}
