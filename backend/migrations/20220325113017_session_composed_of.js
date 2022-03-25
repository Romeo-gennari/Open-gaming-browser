/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('session_composed_of', t => {
        t.integer('id_player').primary().unsigned().references('player.id');
        t.integer('id_preset').primary().unsigned().references('preset.id');
        t.integer('id_game_mode').primary().unsigned().references('game_mode.id');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('session_composed_of');
};
