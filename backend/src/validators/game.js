import { z } from 'zod';

export const createGame = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
  editor: z.string().nonempty(),
  release_year: z.number().int().gt(1900),
});

export const updateGame = createGame.partial();
