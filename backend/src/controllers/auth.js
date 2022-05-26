const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../database.js');
const { createUser, loginUser } = require('../models/user.js');
const duplicateHandler = require('../utils/duplicateHandler.js');
const { fetchUser } = require('./users.js');

/**
 * Login in to an existing account
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function login(req, res, next) {
  const { success, error } = loginUser.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  passport.authenticate('local', { successMessage: 'Logged In' })(req, res, next);
}

/**
 * Create an new account
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function register(req, res, next) {
  const { success, data, error } = createUser.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  const password = await bcrypt.hash(data.password, 10);
  const insertResult = await db('user')
    .insert({
      username: data.username.toLowerCase(),
      email: data.email.toLowerCase(),
      password,
    })
    .catch(duplicateHandler('Username or email is already in use', res));
  if (!insertResult)
    return;

  const user = await fetchUser(insertResult[0]);
  res.status(201).json(user);
}

/**
 * Logout of an account
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
function logout(req, res) {
  req.logout();
  res.status(200).json({ message: 'Logged Out' });
}

module.exports = {
  login,
  register,
  logout,
}
