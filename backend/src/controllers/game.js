import db from '../database';
import { createGame, updateGame } from '../validators/game';
import assertBody from '../utils/assertBody';
import duplicateHandler from '../utils/duplicateHandler';

/**
 * Find a specific game, with the ID given in the request's parameters
 * @param {*} req
 * @param {*} res
 */
export async function findOne(req, res) {
  const id = req.params.id;
  const game = await db('games').where('game_id', id).first();
  if (!game)
    res.status(404).json({ message: 'Game not found' });
  res.status(200).json(game);
}

/**
 * Find all games
 * @param {*} req
 * @param {*} res
 */
export async function findAll(_req, res) {
  const games = await db('games').select();
  res.status(200).json(games);
}

/**
 * Create a new game
 * @param {*} req
 * @param {*} res
 */
export async function create(req, res) {
  const game = req.body;
  assertBody(game, createGame, res);

  // TODO: Check that the body is valid, that means that it contains all the required fields, no unknown field, and
  // that the values are valid (e.g. name is a string, etc.)).
  const result = await db('games')
    .returning(['game_id', 'name', 'description', 'editor', 'release_year'])
    .insert(game)
    .catch(duplicateHandler('Name is already in use', res));
  if (!result)
    return;

  res.status(201).json(result[0]);
}

/**
 * Update a game, with the ID given in the request's parameters
 * @param {*} req
 * @param {*} res
 */
export async function update(req, res) {
  const id = req.params.id;
  const game = req.body;
  assertBody(game, updateGame, res);

  // TODO: Check that the body is valid, that means that it contains some fields, no unknown fields and that the
  // values are valid (e.g. name is a string, etc.)).
  const result = await db('games')
    .where('game_id', id)
    .returning(['game_id', 'name', 'description', 'editor', 'release_year'])
    .update(game);
  res.status(200).json(result[0]);
}

/**
 * Delete a game, with the ID given in the request's parameters
 * @param {*} req
 * @param {*} res
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
