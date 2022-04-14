import db from '../database.js';
import { createGame, updateGame } from '../validators/game.js';
import duplicateHandler from '../utils/duplicateHandler.js';

/**
 * Find a specific game, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function findOne(req, res) {
  const id = req.params.id;
  const game = await db('game').where('id', id).first();
  if (!game)
    res.status(404).json({ message: 'Game not found' });
  res.status(200).json(game);
}

/**
 * Find all games
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function findAll(_req, res) {
  const games = await db('game').select();
  res.status(200).json(games);
}

/**
 * Create a new game
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function create(req, res, next) {
  // Parse the given body to check if it contain a valid game data
  const { success, data, error } = createGame.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  // Check if the given publisher ID exists
  const publisher = await db('publisher').where('id', data.publisher_id).first();
  if (!publisher) {
    res.status(400).json({ message: 'Publisher not found' });
    return;
  }

  // Check if the given editor ID exists
  const editor = await db('editor').where('id', data.editor_id).first();
  if (!editor) {
    res.status(400).json({ message: 'Editor not found' });
    return;
  }

  // Insert the new game into the database
  const insertResult = await db('game')
    .returning(['id'])
    .insert(data)
    .catch(duplicateHandler('Name is already in use', res));
  if (!result)
    return;

  // Return the newly created game with its editor and publisher data
  const result = await db('game')
    .where('id', insertResult[0].id)
    .leftJoin('publisher', 'game.publisher_id', 'publisher.id')
    .leftJoin('editor', 'game.editor_id', 'editor.id')
    .first();

  res.status(201).json(result);
}

/**
 * Update a game, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function update(req, res, next) {
  const id = req.params.id;
  const { success, data, error } = updateGame.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  const result = await db('games')
    .where('game_id', id)
    .returning(['game_id', 'name', 'description', 'editor', 'release_year'])
    .update(data);
  res.status(200).json(result[0]);
}

/**
 * Delete a game, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function remove(req, res) {
  const id = req.params.id;
  const result = await db('games').where('game_id', id).del();
  if (result === 0)
    res.status(404).json({ message: 'Game not found' });
  else
    res.status(204).json();
}

export default {
  findOne,
  findAll,
  create,
  update,
  remove,
};
