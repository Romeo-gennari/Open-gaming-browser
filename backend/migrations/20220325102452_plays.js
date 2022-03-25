/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('plays', t => {
        t.integer('id_game').primary().unsigned().references('game.id');
        t.integer('id_player').primary().unsigned().references('player.id');
        t.integer('level_of_player');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('game_of_genre');
};
