const db = require('../database.js');
const { usersShape } = require('../models/user.js');

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
  findAll,
};
