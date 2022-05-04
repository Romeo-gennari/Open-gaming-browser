import { z } from 'zod';
import * as n from 'nested-knex';

/**
 * Validation
 */
export const createEditor = z.object({
  name: z.string().nonempty(),
}).strict();

export const updateEditor = createEditor.partial();

/**
 * Shape
 */
export const editorShape = n.type({
  id: n.number('editor.id', { id: true }),
  name: n.string('editor.name'),
});
export const editorsShape = n.array(editorShape);
