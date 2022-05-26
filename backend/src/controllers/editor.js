const db = require('../database.js');
const { createEditor, editorsShape, updateEditor } = require('../models/editor.js');
const duplicateHandler = require('../utils/duplicateHandler.js');

async function fetchEditor(id) {
  return await db('editor')
    .where('editor.id', id)
    .select('editor.*')
    .first()
    .then(editor => editor ? { id: editor.id, name: editor.name } : null);
}

/**
 * Find a specific editor, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function findOne(req, res) {
  const editor = await fetchEditor(req.params.id);
  if (editor)
    res.status(200).json(editor);
  else
    res.status(404).json({ message: 'Editor not found' });
}

/**
 * Find all editors
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function findAll(_req, res) {
  const editors = await editorsShape.withQuery(
    db('editor').select('editor.*')
  );
  res.status(200).json(editors);
}

/**
 * Create a new editor
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function create(req, res, next) {
  // Parse the given body to check if it contain a valid editor data
  const { success, data, error } = createEditor.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  // Insert the new editor into the database
  const insertResult = await db('editor')
    .insert(data)
    .catch(duplicateHandler('Name is already in use', res));
  if (!insertResult)
    return;

  // Return the newly created editor
  const editor = await fetchEditor(insertResult[0]);
  res.status(201).json(editor);
}

/**
 * Update an editor, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function update(req, res, next) {
  const { success, data, error } = updateEditor.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  await db('editor')
    .where('id', req.params.id)
    .update(data);

  const editor = await fetchEditor(req.params.id);
  res.status(200).json(editor);
}

/**
 * Delete an editor, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function remove(req, res) {
  const result = await db('editor').where('id', req.params.id).del();
  if (result === 0)
    res.status(404).json({ message: 'Editor not found' });
  else
    res.status(204).json();
}

module.exports = {
  fetchEditor,
  findOne,
  findAll,
  create,
  update,
  remove,
};
