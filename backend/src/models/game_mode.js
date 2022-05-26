const { z } = require('zod');
const n = require('nested-knex');
const { gameShape } = require('./game.js');

/**
 * Validation
 */
const createGameMode = z.object({
  name: z.string().nonempty(),
  minimum_players: z.number().int().gt(0),
  maximum_players: z.number().int().gt(0),
  estimated_time_min: z.number().int().gt(0),
  game_id: z.number().int().gt(0),
}).strict();

const updateGameMode = createGameMode.partial();

/**
 * Shape
 */
const gameModeShape = n.type({
  id: n.number('game_mode.id', { id: true }),
  name: n.string('game_mode.name'),
  minimum_players: n.number('game_mode.minimum_players'),
  maximum_players: n.number('game_mode.maximum_players'),
  estimated_time_min: n.number('game_mode.estimated_time_min'),
  game: gameShape,
});
const gameModesShape = n.array(gameModeShape);

module.exports = {
  createGameMode,
  updateGameMode,
  gameModeShape,
  gameModesShape,
};
