/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('is_in_preset', t => {
        t.integer('id_player1').primary().unsigned().references('player.id');
        t.integer('id_player2').primary().unsigned().references('player.id');
        t.string('friend_group');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('friend_of');
};
