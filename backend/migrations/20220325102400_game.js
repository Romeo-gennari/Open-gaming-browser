/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('game', t => {
    t.increments('id').primary().unsigned();
    t.string('name').unique().index()
    t.date('release_date');
    t.string('description');
    t.integer('editor_id').references('editor.id');
    t.integer('publisher_id').references('publisher.id');
    t.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('game');
}
