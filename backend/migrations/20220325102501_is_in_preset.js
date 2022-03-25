/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('is_in_preset', t => {
        t.integer('id_game_mode').primary().unsigned().references('game_mode.id');
        t.integer('id_player').primary().unsigned().references('player.id');
        t.integer('id_preset').primary().unsigned().references('preset.id');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('is_in_preset');
};
