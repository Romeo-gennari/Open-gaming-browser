/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('game', t => {
        t.increments('id').primary().unsigned();
        t.string('name').unique().index()
        t.date('release_date');
        t.string('description');
        t.integer('id_editor').references('editor.id');
        t.integer('id_publisher').references('publisher.id');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('game');
};
