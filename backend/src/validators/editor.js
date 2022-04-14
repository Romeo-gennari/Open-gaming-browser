import { z } from 'zod';

export const createEditor = z.object({
  name: z.string().nonempty(),
}).strict();

export const updateEditor = createEditor.partial();
