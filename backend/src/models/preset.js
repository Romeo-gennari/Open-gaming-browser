const { z } = require('zod');
const n = require('nested-knex');
const { userShape } = require('./user.js');

/**
 * Validation
 */
const createPreset = z.object({
  name: z.string().nonempty(),
  type: z.enum(['default', 'classic', 'temporary']),
}).strict();

const updatePreset = createPreset.partial();

/**
 * Shape
 */
const presetShape = n.type({
  id: n.number('preset.id', { id: true }),
  name: n.string('preset.name'),
  type: n.date('preset.type'),
  user: userShape,
});
const presetsShape = n.array(presetShape);

module.exports = {
  createPreset,
  updatePreset,
  presetShape,
  presetsShape,
};
