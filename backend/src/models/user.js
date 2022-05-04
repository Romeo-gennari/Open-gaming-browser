import { z } from 'zod';
import * as n from 'nested-knex';

/**
 * Validation
 */
export const createUser = z.object({
  username: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
}).strict();

export const loginUser = z.union([
  z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty(),
  }).strict(),
  z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
  }).strict()
]);

/**
 * Shape
 */
export const userShape = n.type({
  id: n.number('user.id', { id: true }),
  username: n.string('user.username'),
  email: n.string('user.email'),
});
