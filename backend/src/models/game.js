const { z } = require('zod');
const { dateSchema } = require('../utils/zodSchemas.js');
const n = require('nested-knex');
const { editorShape } = require('./editor.js');
const { publisherShape } = require('./publisher.js');

/**
 * Validation
 */
const createGame = z.object({
  name: z.string().nonempty(),
  release_date: dateSchema,
  image_url: z.string().url().optional(),
  description: z.string().nonempty(),
  editor_id: z.number().int().gt(0),
  publisher_id: z.number().int().gt(0),
}).strict();

const updateGame = createGame.partial();

/**
 * Shape
 */
const gameShape = n.type({
  id: n.number('game.id', { id: true }),
  name: n.string('game.name'),
  release_date: n.date('game.release_date'),
  image_url: n.string('game.image_url'),
  description: n.string('game.description'),
  editor: editorShape,
  publisher: publisherShape,
});
const gamesShape = n.array(gameShape);

module.exports = {
  createGame,
  updateGame,
  gameShape,
  gamesShape,
};
