export default {
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  up: (knex) => {
    return knex.schema.createTable('game', t => {
      t.increments('id').primary().unsigned();
      t.string('name').unique().index()
      t.date('release_date');
      t.string('description');
      t.integer('editor_id').references('editor.id');
      t.integer('publisher_id').references('publisher.id');
    });
  },

  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  down: (knex) => {
    return knex.schema.dropTable('game');
  },
};
