const { z } = require('zod');
const n = require('nested-knex');

/**
 * Validation
 */
const createEditor = z.object({
  name: z.string().nonempty(),
}).strict();

const updateEditor = createEditor.partial();

/**
 * Shape
 */
const editorShape = n.type({
  id: n.number('editor.id', { id: true }),
  name: n.string('editor.name'),
});
const editorsShape = n.array(editorShape);

module.exports = {
  createEditor,
  updateEditor,
  editorShape,
  editorsShape,
}
