/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('game_mode', t => {
        t.increments('id').primary().unsigned();
        t.string('name').unique().index()
        t.integer('minimum_nb_of_players');
        t.integer('maximum_nb_of_players');
        t.integer('id_game').references('game.id');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('game_mode');
};
