const { z } = require('zod');
const n = require('nested-knex');

/**
 * Validation
 */
const createPublisher = z.object({
  name: z.string().nonempty(),
}).strict();

const updatePublisher = createPublisher.partial();

/**
 * Shape
 */
const publisherShape = n.type({
  id: n.number('publisher.id', { id: true }),
  name: n.string('publisher.name'),
});
const publishersShape = n.array(publisherShape);

module.exports = {
  createPublisher,
  updatePublisher,
  publisherShape,
  publishersShape,
}
