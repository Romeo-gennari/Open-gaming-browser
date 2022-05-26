const db = require('../database.js');
const { createPreset, presetsShape, updatePreset, presetShape } = require('../models/preset.js');
const failHandler = require('../utils/failHandler.js');
const notFoundHandler = require('../utils/notFoundHandler.js');

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
  const presets = await presetsShape.withQuery(
    db('preset')
      .select('preset.*')
      .where('preset.user_id', req.user.id)
      .leftJoin('user', 'preset.user_id', 'user.id')
  );
  res.status(200).json(presets);
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

module.exports = {
  fetchPreset,
  findOne,
  findAll,
  create,
  update,
  remove,
};
