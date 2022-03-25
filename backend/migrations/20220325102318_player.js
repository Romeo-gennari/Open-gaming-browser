/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('player', t => {
        t.increments('id').primary().unsigned();
        t.string('mail_address').unique();
        t.string('username');
        t.string('password');
        t.string('path_to_profile_pic');
        t.string('description');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('player');
};
