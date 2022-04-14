import db from '../database.js';
import { createEditor, updateEditor } from '../validators/editor.js';
import duplicateHandler from '../utils/duplicateHandler.js';

/**
 * Find a specific editor, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function findOne(req, res) {
  const id = req.params.id;
  const editor = await db('editor').where('id', id).first();
  if (!editor)
    res.status(404).json({ message: 'Editor not found' });
  res.status(200).json(editor);
}

/**
 * Find all editors
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function findAll(_req, res) {
  const editors = await db('editor').select();
  res.status(200).json(editors);
}

/**
 * Create a new editor
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function create(req, res, next) {
  // Parse the given body to check if it contain a valid editor data
  const { success, data, error } = createEditor.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  // Insert the new editor into the database
  const insertResult = await db('editor')
    .returning(['id'])
    .insert(data)
    .catch(duplicateHandler('Name is already in use', res));
  if (!insertResult)
    return;

  // Return the newly created editor
  const result = await db('editor')
    .where('id', insertResult[0].id)
    .first();

  res.status(201).json(result);
}

/**
 * Update an editor, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function update(req, res, next) {
  const id = req.params.id;
  const { success, data, error } = updateEditor.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  const result = await db('editor')
    .where('id', id)
    .returning(['id', 'name'])
    .update(data);
  res.status(200).json(result[0]);
}

/**
 * Delete an editor, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function remove(req, res) {
  const id = req.params.id;
  const result = await db('editor').where('id', id).del();
  if (result === 0)
    res.status(404).json({ message: 'Editor not found' });
  else
    res.status(204).json();
}

export default {
  findOne,
  findAll,
  create,
  update,
  remove,
};
