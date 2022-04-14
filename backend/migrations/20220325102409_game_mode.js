/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('game_mode', t => {
    t.increments('id').primary().unsigned();
    t.string('name').unique().index()
    t.integer('minimum_players');
    t.integer('maximum_players');
    t.integer('game_id').references('game.id');
    t.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('game_mode');
}
