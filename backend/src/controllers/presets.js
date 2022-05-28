/** @type {import('knex').Knex} */
const db = require('../database.js');
const { createPreset, presetsShape, updatePreset, presetShape, presetModesShape } = require('../models/preset.js');
const duplicateHandler = require('../utils/duplicateHandler.js');
const failHandler = require('../utils/failHandler.js');
const notFoundHandler = require('../utils/notFoundHandler.js');
const { fetchGameMode } = require('./game_mode.js');

async function fetchPreset(id, userId) {
  return await presetShape.withQuery(
    db('preset')
      .where('preset.id', id)
      .andWhere('preset.user_id', userId)
      .leftJoin('user', 'preset.user_id', 'user.id')
      .select('preset.*')
  ).catch(notFoundHandler);
}

/**
 * Find a specific preset, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function findOne(req, res) {
  const preset = await fetchPreset(req.params.id, req.user.id);
  if (preset)
    res.status(200).json(preset);
  else
    res.status(404).json({ message: 'Preset not found' });
}

/**
 * Find all presets
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function findAll(req, res) {
  const modes = await presetModesShape.withQuery(
    db('is_in_preset')
      .select('preset.*', 'game_mode.*', 'game.*', 'editor.*', 'publisher.*')
      .leftJoin('preset', 'is_in_preset.preset_id', 'preset.id')
      .leftJoin('user', 'user.id', 'preset.user_id')
      .leftJoin('game_mode', 'is_in_preset.game_mode_id', 'game_mode.id')
      .leftJoin('game', 'game.id', 'game_mode.game_id')
      .leftJoin('editor', 'editor.id', 'game.editor_id')
      .leftJoin('publisher', 'publisher.id', 'game.publisher_id')
      .where('preset.user_id', req.user.id)
  );
  res.status(200).json(modes);
}

/**
 * Create a new preset
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function create(req, res, next) {
  // Parse the given body to check if it contain a valid preset data
  const { success, data, error } = createPreset.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  // Insert the new preset into the database
  const insertResult = await db('preset')
    .insert({ ...data, user_id: req.user.id })
    .catch(failHandler(res));
  if (!insertResult)
    return;

  // Return the newly created preset
  const preset = await fetchPreset(insertResult[0], req.user.id);
  res.status(201).json(preset);
}

/**
 * Update an preset, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function update(req, res, next) {
  const { success, data, error } = updatePreset.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  await db('preset')
    .where('id', req.params.id)
    .andWhere('user_id', req.user.id)
    .update(data)
    .catch(notFoundHandler);

  const preset = await fetchPreset(req.params.id, req.user.id);
  res.status(200).json(preset);
}

/**
 * Delete an preset, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function remove(req, res) {
  const result = await db('preset')
    .where('id', req.params.id)
    .andWhere('user_id', req.user.id)
    .del();
  if (result === 0)
    res.status(404).json({ message: 'Preset not found' });
  else
    res.status(204).json();
}

/**
 * Find all modes in a preset
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function findAllModes(req, res) {
  const preset = await fetchPreset(req.params.presetId, req.user.id);
  if (!preset) {
    res.status(404).json({ message: 'Preset not found' });
    return;
  }

  const modes = await presetModesShape.withQuery(
    db('is_in_preset')
      .select('preset.*', 'game_mode.*', 'game.*', 'editor.*', 'publisher.*')
      .leftJoin('preset', 'is_in_preset.preset_id', 'preset.id')
      .leftJoin('user', 'user.id', 'preset.user_id')
      .leftJoin('game_mode', 'is_in_preset.game_mode_id', 'game_mode.id')
      .leftJoin('game', 'game.id', 'game_mode.game_id')
      .leftJoin('editor', 'editor.id', 'game.editor_id')
      .leftJoin('publisher', 'publisher.id', 'game.publisher_id')
      .where('preset.id', preset.id)
  );
  res.status(201).json(modes);
}

/**
 * Add a mode to a preset
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function addMode(req, res) {
  const preset = await fetchPreset(req.params.presetId, req.user.id);
  if (!preset) {
    res.status(404).json({ message: 'Preset not found' });
    return;
  }

  const mode = await fetchGameMode(req.params.gameModeId);
  if (!mode) {
    res.status(404).json({ message: 'GameMode not found' });
    return;
  }

  const presetMode = await db('is_in_preset')
    .insert({ preset_id: preset.id, game_mode_id: mode.id })
    .catch(duplicateHandler('Mode already added', res));
  if (!presetMode)
    return;

  res.status(200).json({ preset, game_mode: mode });
}


/**
 * Remove a mode from a preset
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function removeMode(req, res) {
  const presetMode = await db('is_in_preset')
    .leftJoin('preset', 'is_in_preset.preset_id', 'preset.id')
    .where('preset.user_id', req.user.id)
    .andWhere('is_in_preset.game_mode_id', req.params.gameModeId)
    .del();
  if (!presetMode) {
    res.status(404).json({ message: 'Mode not found' });
    return;
  }

  res.status(204).json();
}

module.exports = {
  fetchPreset,
  findOne,
  findAll,
  create,
  update,
  remove,
  findAllModes,
  addMode,
  removeMode,
};
