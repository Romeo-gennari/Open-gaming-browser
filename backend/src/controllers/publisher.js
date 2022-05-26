/** @type {import('knex').Knex} */
const db = require('../database.js');
const { createPublisher, publishersShape, updatePublisher } = require('../models/publisher.js');
const duplicateHandler = require('../utils/duplicateHandler.js');

async function fetchPublisher(id) {
  return await db('publisher')
    .where('publisher.id', id)
    .select('publisher.*')
    .first()
    .then(publisher => publisher ? { id: publisher.id, name: publisher.name } : null);
}

/**
 * Find a specific publisher, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function findOne(req, res) {
  const publisher = await fetchPublisher(req.params.id);
  if (publisher)
    res.status(200).json(publisher);
  else
    res.status(404).json({ message: 'Publisher not found' });
}

/**
 * Find all publishers
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function findAll(_req, res) {
  const publishers = await publishersShape.withQuery(
    db('publisher').select('publisher.*')
  );
  res.status(200).json(publishers);
}

/**
 * Create a new publisher
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function create(req, res, next) {
  // Parse the given body to check if it contain a valid publisher data
  const { success, data, error } = createPublisher.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  // Insert the new publisher into the database
  const insertResult = await db('publisher')
    .insert(data)
    .catch(duplicateHandler('Name is already in use', res));
  if (!insertResult)
    return;

  // Return the newly created publisher
  const publisher = await fetchPublisher(insertResult[0]);
  res.status(201).json(publisher);
}

/**
 * Update an publisher, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function update(req, res, next) {
  const { success, data, error } = updatePublisher.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  await db('publisher')
    .where('id', req.params.id)
    .update(data);

  const publisher = await fetchPublisher(req.params.id);
  res.status(200).json(publisher);
}

/**
 * Delete an publisher, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function remove(req, res) {
  const result = await db('publisher').where('id', req.params.id).del();
  if (result === 0)
    res.status(404).json({ message: 'Publisher not found' });
  else
    res.status(204).json();
}

module.exports = {
  fetchPublisher,
  findOne,
  findAll,
  create,
  update,
  remove,
};
