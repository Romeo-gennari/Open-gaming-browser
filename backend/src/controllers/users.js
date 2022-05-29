const bcrypt = require('bcrypt');
/** @type {import('knex').Knex} */
const db = require('../database.js');
const { usersShape, updateUser } = require('../models/user.js');
const safeUser = require('../utils/safeUser.js');

async function fetchUser(id) {
  return await db('user')
    .where('user.id', id)
    .select('user.*')
    .first()
    .then(user => user ? safeUser(user) : null);
}

/**
 * Find all users
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function findAll(_req, res) {
  const users = await usersShape.withQuery(
    db('user').select('user.*')
  );
  res.status(200).json(users);
}

/**
 * Patch a user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function update(req, res, next) {
  if (req.user.id !== Number(req.params.userId)) {
    res.status(403).json({ message: 'Can only update self' });
    return;
  }

  const { success, data, error } = updateUser.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  if (data.password)
    data.password = await bcrypt.hash(data.password, 10);

  await db('user')
    .where('id', req.params.userId)
    .update(data);

  const user = await fetchUser(req.params.userId);
  res.status(200).json(user);
}


module.exports = {
  fetchUser,
  findAll,
  update,
};
