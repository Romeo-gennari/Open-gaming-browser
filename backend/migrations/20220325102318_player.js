export default {
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  up: (knex) => {
    return knex.schema.createTable('player', t => {
      t.increments('id').primary().unsigned();
      t.string('mail_address').unique();
      t.string('username');
      t.string('password');
      t.string('avatar_url');
      t.string('description');
    });
  },

  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  down: (knex) => {
    return knex.schema.dropTable('player');
  },
};
