/** @type {import('knex').Knex} */
const db = require('../database.js');
const { createGameMode, gameModesShape, updateGameMode, gameModeShape } = require('../models/game_mode.js');
const duplicateHandler = require('../utils/duplicateHandler.js');
const notFoundHandler = require('../utils/notFoundHandler.js');

async function fetchGameMode(id) {
  return await gameModeShape.withQuery(
    db('game_mode')
      .select('game_mode.*', 'game.*')
      .where('game_mode.id', id)
      .leftJoin('game', 'game_mode.game_id', 'game.id')
      .leftJoin('editor', 'game.editor_id', 'editor.id')
      .leftJoin('publisher', 'game.publisher_id', 'publisher.id')
  ).catch(notFoundHandler);
}

/**
 * Find a specific game mode, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function findOne(req, res) {
  const gameMode = await fetchGameMode(req.params.id);
  if (gameMode)
    res.status(200).json(gameMode);
  else
    res.status(404).json({ message: 'GameMode not found' });
}

/**
 * Find all game modes
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function findAll(_req, res) {
  const gameModes = await gameModesShape.withQuery(
    db('game_mode')
      .select('game_mode.*', 'game.*')
      .leftJoin('game', 'game_mode.game_id', 'game.id')
      .leftJoin('editor', 'game.editor_id', 'editor.id')
      .leftJoin('publisher', 'game.publisher_id', 'publisher.id')
  );
  res.status(200).json(gameModes);
}

/**
 * Create a new game mode
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function create(req, res, next) {
  // Parse the given body to check if it contain a valid game mode data
  const { success, data, error } = createGameMode.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  const game = await db('game')
    .where('id', data.game_id)
    .first();
  if (!game) {
    res.status(404).json({ message: 'Game not found' });
    return;
  }

  // Insert the new game mode into the database
  const insertResult = await db('game_mode')
    .insert(data)
    .catch(duplicateHandler('Name is already in use', res));
  if (!insertResult)
    return;

  // Return the newly created game mode
  const gameMode = await fetchGameMode(insertResult[0], req.user.id);
  res.status(201).json(gameMode);
}

/**
 * Update an game mode, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function update(req, res, next) {
  const { success, data, error } = updateGameMode.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  await db('game_mode')
    .where('id', req.params.id)
    .update(data)
    .catch(notFoundHandler);

  const gameMode = await fetchGameMode(req.params.id, req.user.id);
  res.status(200).json(gameMode);
}

/**
 * Delete an game mode, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function remove(req, res) {
  const result = await db('game_mode')
    .where('id', req.params.id)
    .del();
  if (result === 0)
    res.status(404).json({ message: 'GameMode not found' });
  else
    res.status(204).json();
}

module.exports = {
  fetchGameMode,
  findOne,
  findAll,
  create,
  update,
  remove,
};
