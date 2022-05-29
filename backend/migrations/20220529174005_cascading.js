/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema
    .alterTable('game', t => {
      t.dropForeign('editor_id');
      t.dropForeign('publisher_id');
      t.integer('editor_id').alter().unsigned().references('editor.id').onDelete('SET NULL');
      t.integer('publisher_id').alter().unsigned().references('publisher.id').onDelete('SET NULL');
    })
    .alterTable('game_mode', t => {
      t.dropForeign('game_id');
      t.integer('game_id').alter().unsigned().references('game.id').onDelete('CASCADE');
    })
    .alterTable('game_of_genre', t => {
      t.dropForeign('game_id');
      t.dropForeign('genre_id');
      t.integer('game_id').alter().unsigned().references('game.id').onDelete('CASCADE');
      t.integer('genre_id').alter().unsigned().references('genre.id').onDelete('CASCADE');
    })
    .alterTable('plays', t => {
      t.dropForeign('game_id');
      t.dropForeign('user_id');
      t.integer('game_id').alter().unsigned().references('game.id').onDelete('CASCADE');
      t.integer('user_id').alter().unsigned().references('user.id').onDelete('CASCADE');
    })
    .alterTable('is_in_preset', t => {
      t.dropForeign('game_mode_id');
      t.dropForeign('preset_id');
      t.integer('game_mode_id').alter().unsigned().references('game_mode.id').onDelete('CASCADE');
      t.integer('preset_id').alter().unsigned().references('preset.id').onDelete('CASCADE');
    })
    .alterTable('friend_of', t => {
      t.dropForeign('user1_id');
      t.dropForeign('user2_id');
      t.integer('user1_id').alter().unsigned().references('user.id').onDelete('CASCADE');
      t.integer('user2_id').alter().unsigned().references('user.id').onDelete('CASCADE');
    })
    .alterTable('session_composed_of', t => {
      t.dropForeign('user_id');
      t.dropForeign('preset_id');
      t.dropForeign('game_mode_id');
      t.integer('user_id').alter().unsigned().references('user.id').onDelete('CASCADE');
      t.integer('preset_id').alter().unsigned().references('preset.id').onDelete('CASCADE');
      t.integer('game_mode_id').alter().unsigned().references('game_mode.id').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema
    .alterTable('game', t => {
      t.dropForeign('editor_id');
      t.dropForeign('publisher_id');
      t.integer('editor_id').alter().unsigned().references('editor.id').onDelete('RESTRICT');
      t.integer('publisher_id').alter().unsigned().references('publisher.id').onDelete('RESTRICT');
    })
    .alterTable('game_mode', t => {
      t.dropForeign('game_id');
      t.integer('game_id').alter().unsigned().references('game.id').onDelete('RESTRICT');
    })
    .alterTable('game_of_genre', t => {
      t.dropForeign('game_id');
      t.dropForeign('genre_id');
      t.integer('game_id').alter().unsigned().references('game.id').onDelete('RESTRICT');
      t.integer('genre_id').alter().unsigned().references('genre.id').onDelete('RESTRICT');
    })
    .alterTable('plays', t => {
      t.dropForeign('game_id');
      t.dropForeign('user_id');
      t.integer('game_id').alter().unsigned().references('game.id').onDelete('RESTRICT');
      t.integer('user_id').alter().unsigned().references('user.id').onDelete('RESTRICT');
    })
    .alterTable('is_in_preset', t => {
      t.dropForeign('game_mode_id');
      t.dropForeign('preset_id');
      t.integer('game_mode_id').alter().unsigned().references('game_mode.id').onDelete('RESTRICT');
      t.integer('preset_id').alter().unsigned().references('preset.id').onDelete('RESTRICT');
    })
    .alterTable('friend_of', t => {
      t.dropForeign('user1_id');
      t.dropForeign('user2_id');
      t.integer('user1_id').alter().unsigned().references('user.id').onDelete('RESTRICT');
      t.integer('user2_id').alter().unsigned().references('user.id').onDelete('RESTRICT');
    })
    .alterTable('session_composed_of', t => {
      t.dropForeign('user_id');
      t.dropForeign('preset_id');
      t.dropForeign('game_mode_id');
      t.integer('user_id').alter().unsigned().references('user.id').onDelete('RESTRICT');
      t.integer('preset_id').alter().unsigned().references('preset.id').onDelete('RESTRICT');
      t.integer('game_mode_id').alter().unsigned().references('game_mode.id').onDelete('RESTRICT');
    });
};
