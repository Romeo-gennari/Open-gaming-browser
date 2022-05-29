const { z } = require('zod');
const n = require('nested-knex');

/**
 * Validation
 */
const createUser = z.object({
  username: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
}).strict();

const loginUser = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
}).strict();

const updateUser = z.object({
  username: z.string().nonempty().optional(),
  email: z.string().email().nonempty().optional(),
  password: z.string().nonempty().optional(),
  avatar_url: z.string().optional(),
  description: z.string().optional(),
}).strict();

/**
 * Shape
 */
const userShape = n.type({
  id: n.number('user.id', { id: true }),
  username: n.string('user.username'),
  avatar_url: n.string('user.avatar_url'),
  email: n.string('user.email'),
});
const usersShape = n.array(userShape);

module.exports = {
  createUser,
  loginUser,
  updateUser,
  userShape,
  usersShape,
}
