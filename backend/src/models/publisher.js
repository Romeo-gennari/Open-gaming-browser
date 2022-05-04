import { z } from 'zod';
import * as n from 'nested-knex';

/**
 * Validation
 */
export const createPublisher = z.object({
  name: z.string().nonempty(),
}).strict();

export const updatePublisher = createPublisher.partial();

/**
 * Shape
 */
export const publisherShape = n.type({
  id: n.number('publisher.id', { id: true }),
  name: n.string('publisher.name'),
});
export const publishersShape = n.array(publisherShape);
