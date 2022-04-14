import { z } from 'zod';
import { dateSchema } from '../utils/zodSchemas.js';

export const createGame = z.object({
  name: z.string().nonempty(),
  release_date: dateSchema,
  description: z.string().nonempty(),
  editor_id: z.number().int().gt(0),
  publisher_id: z.number().int().gt(0),
}).strict();

export const updateGame = createGame.partial();
