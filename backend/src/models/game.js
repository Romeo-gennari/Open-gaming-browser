import { z } from 'zod';
import { dateSchema } from '../utils/zodSchemas.js';
import * as n from 'nested-knex';
import { editorShape } from './editor.js';
import { publisherShape } from './publisher.js';

/**
 * Validation
 */
export const createGame = z.object({
  name: z.string().nonempty(),
  release_date: dateSchema,
  image_url: z.string().url().optional(),
  description: z.string().nonempty(),
  editor_id: z.number().int().gt(0),
  publisher_id: z.number().int().gt(0),
}).strict();

export const updateGame = createGame.partial();

/**
 * Shape
 */
export const gameShape = n.type({
  id: n.number('game.id', { id: true }),
  name: n.string('game.name'),
  release_date: n.date('game.release_date'),
  image_url: n.string('game.image_url'),
  description: n.string('game.description'),
  editor: editorShape,
  publisher: publisherShape,
});
export const gamesShape = n.array(gameShape);
