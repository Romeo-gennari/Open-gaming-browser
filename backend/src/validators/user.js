import { z } from 'zod';

export const createUser = z.object({
  username: z.string().nonempty(),
  firstname: z.string().nonempty(),
  lastname: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

export const loginUser = z.union([
  z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty(),
  }),
  z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
  })
]);
