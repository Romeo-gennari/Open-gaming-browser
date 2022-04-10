export default {
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  up: (knex) => {
    return knex.schema.createTable('is_in_preset', t => {
      t.integer('player1_id').primary().unsigned().references('player.id');
      t.integer('player2_id').primary().unsigned().references('player.id');
      t.string('friend_group');
    });
  },

  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  down: (knex) => {
    return knex.schema.dropTable('friend_of');
  },
};
