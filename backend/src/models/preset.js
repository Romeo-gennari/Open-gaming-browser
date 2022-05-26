const { z } = require('zod');
const n = require('nested-knex');
const { userShape } = require('./user.js');
const { gameModesShape } = require('./game_mode.js');

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

const presetModeShape = n.type({
  id: n.number('preset.id', { id: true }),
  name: n.string('preset.name'),
  type: n.date('preset.type'),
  user: userShape,
  modes: gameModesShape,
});
const presetModesShape = n.array(presetModeShape);

module.exports = {
  createPreset,
  updatePreset,
  presetShape,
  presetsShape,
  presetModeShape,
  presetModesShape,
};
