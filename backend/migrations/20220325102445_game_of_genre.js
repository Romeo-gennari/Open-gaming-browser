/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('game_of_genre', t => {
        t.integer('id_game').primary().unsigned().references('game.id');
        t.integer('id_genre').primary().unsigned().references('genre.id');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('game_of_genre');
};
