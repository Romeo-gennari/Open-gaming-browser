import bcrypt from 'bcrypt';
import passport from 'passport';
import db from '../database.js';
import { createUser, loginUser } from '../models/user.js';
import duplicateHandler from '../utils/duplicateHandler.js';

/**
 * Login in to an existing account
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function login(req, res, next) {
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
export async function register(req, res, next) {
  const { success, data, error } = createUser.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  const existingUser = await db('user')
    .select()
    .where('email', data.email?.toLowerCase())
    .orWhere('username', data.username?.toLowerCase())
    .first();
  if (existingUser) {
    res.status(400).json({ message: 'Username or email is already in use' });
    return;
  }

  const password = await bcrypt.hash(data.password, 10);
  const newUser = await db('user')
    .returning(['username', 'email'])
    .insert({
      username: data.username.toLowerCase(),
      email: data.email.toLowerCase(),
      password,
    })
    .catch(duplicateHandler('Name is already in use', res));

  res.status(201).json(newUser[0]);
}

/**
 * Logout of an account
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export function logout(req, res) {
  req.logout();
  res.status(200).json({ message: 'Logged Out' });
}
