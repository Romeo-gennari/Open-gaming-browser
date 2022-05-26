const db = require('../database.js');
const { createGame, gamesShape, updateGame } = require('../models/game.js');
const duplicateHandler = require('../utils/duplicateHandler.js');
const { gameShape } = require('../models/game.js');
const notFoundHandler = require('../utils/notFoundHandler.js');

async function fetchGame(id) {
  return await gameShape.withQuery(
    db('game')
      .where('game.id', id)
      .select('game.*', 'publisher.*', 'editor.*')
      .leftJoin('publisher', 'game.publisher_id', 'publisher.id')
      .leftJoin('editor', 'game.editor_id', 'editor.id')
  ).catch(notFoundHandler);
}

/**
 * Find a specific game, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function findOne(req, res) {
  const game = await fetchGame(req.params.id);
  if (game)
    res.status(200).json(game);
  else
    res.status(404).json({ message: 'Game not found' });
}

/**
 * Find all games
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function findAll(_req, res) {
  const games = await gamesShape.withQuery(
    db('game')
      .select('game.*', 'publisher.name as publisher_name', 'editor.name as editor_name')
      .leftJoin('publisher', 'game.publisher_id', 'publisher.id')
      .leftJoin('editor', 'game.editor_id', 'editor.id')
  );
  res.status(200).json(games);
}

/**
 * Create a new game
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function create(req, res, next) {
  // Parse the given body to check if it contain a valid game data
  const { success, data, error } = createGame.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  // Check if the given publisher ID exists
  const publisher = await db('publisher')
    .where('id', data.publisher_id)
    .first();
  if (!publisher) {
    res.status(400).json({ message: 'Publisher not found' });
    return;
  }

  // Check if the given editor ID exists
  const editor = await db('editor')
    .where('id', data.editor_id)
    .first();
  if (!editor) {
    res.status(400).json({ message: 'Editor not found' });
    return;
  }

  // Insert the new game into the database
  const insertResult = await db('game')
    .insert(data)
    .catch(duplicateHandler('Name is already in use', res));
  if (!insertResult)
    return;
  console.log('DEBUG ~ file: game.js ~ line 76 ~ create ~ insertResult', insertResult);

  // Return the newly created game with its editor and publisher data
  const game = await fetchGame(insertResult[0]);
  res.status(201).json(game);
}

/**
 * Update a game, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function update(req, res, next) {
  const { success, data, error } = updateGame.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  await db('game')
    .where('id', req.params.id)
    .update(data);

  const game = await fetchGame(req.params.id);
  res.status(200).json(game);
}

/**
 * Delete a game, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function remove(req, res) {
  const result = await db('game').where('id', req.params.id).del();
  if (result === 0)
    res.status(404).json({ message: 'Game not found' });
  else
    res.status(204).json();
}

module.exports = {
  findOne,
  findAll,
  create,
  update,
  remove,
};
