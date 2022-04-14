import { z } from 'zod';

export const createPublisher = z.object({
  name: z.string().nonempty(),
}).strict();

export const updatePublisher = createPublisher.partial();
