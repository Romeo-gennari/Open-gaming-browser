export default {
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  up: (knex) => {
    return knex.schema.createTable('genre', t => {
      t.increments('id').primary().unsigned();
      t.string('name').unique();
      t.string('description');
    });
  },

  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  down: (knex) => {
    return knex.schema.dropTable('genre');
  },
};
