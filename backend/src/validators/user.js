import { z } from 'zod';

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
