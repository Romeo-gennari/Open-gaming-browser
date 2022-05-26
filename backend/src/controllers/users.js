/** @type {import('knex').Knex} */
const db = require('../database.js');
const { usersShape } = require('../models/user.js');
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


module.exports = {
  fetchUser,
  findAll,
};
