/** @type {import('knex').Knex} */
const db = require('../database.js');
const duplicateHandler = require('../utils/duplicateHandler.js');
const { createFriends } = require('../models/friends.js');
const { usersShape } = require('../models/user.js');
const { fetchUser } = require('./users.js');
const { presetModesShape } = require('../models/preset.js');

async function fetchFriend(id1, id2) {
  const friend = await db('friend_of')
    .where({ user1_id: id1, user2_id: id2 })
    .first();
  if (!friend)
    return null;

  delete friend.user1_id;
  delete friend.user2_id;

  friend.user1 = await fetchUser(id1);
  friend.user2 = await fetchUser(id2);

  return friend;
}

/**
 * Find a specific friend, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function findOne(req, res) {
  const friend = await fetchFriend(req.user.id, req.params.id);
  if (!friend)
    res.status(404).json({ message: 'Friend not found' });
  res.status(200).json(friend);
}

/**
 * Find all friends
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function findAll(req, res) {
  const friends = await db('friend_of')
    .where('user1_id', req.user.id)
    .select();
  const users = await usersShape.withQuery(db('user').select());

  for (const friend of friends) {
    friend.user1 = users.find(user => user.id === friend.user1_id);
    friend.user2 = users.find(user => user.id === friend.user2_id);
    delete friend.user1_id;
    delete friend.user2_id;
  }

  res.status(200).json(friends);
}

/**
 * Create a new friend
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function create(req, res, next) {
  // Parse the given body to check if it contain a valid editor data
  const { success, data, error } = createFriends.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  // Check if the user2 exists
  const user2 = await db('user')
    .where('id', data.user2_id)
    .first();
  if (!user2) {
    res.status(400).json({ message: 'User not found' });
    return;
  }

  if (user2.id === req.user.id) {
    res.status(400).json({ message: 'You cannot add yourself as a friend' });
    return;
  }

  // Insert the new friend in the database
  const insertResult = await db('friend_of')
    .insert({ ...data, user1_id: req.user.id })
    .catch(duplicateHandler('Already your friend', res));
  if (!insertResult)
    return;

  // Return the newly created friend
  const result = await fetchFriend(req.user.id, data.user2_id);
  res.status(201).json(result);
}

/**
 * Delete a friend, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function remove(req, res) {
  const result = await db('friend_of')
    .where('user1_id', req.user.id)
    .where('user2_id', req.params.id)
    .del();
  if (result === 0)
    res.status(404).json({ message: 'Friend not found' });
  else
    res.status(204).json();
}

async function findAllPresets(req, res) {
  const modes = await presetModesShape.withQuery(
    db('is_in_preset')
      .select('preset.*', 'game_mode.*', 'game.*', 'editor.*', 'publisher.*')
      .rightJoin('preset', 'is_in_preset.preset_id', 'preset.id')
      .leftJoin('user', 'user.id', 'preset.user_id')
      .leftJoin('game_mode', 'is_in_preset.game_mode_id', 'game_mode.id')
      .leftJoin('game', 'game.id', 'game_mode.game_id')
      .leftJoin('editor', 'editor.id', 'game.editor_id')
      .leftJoin('publisher', 'publisher.id', 'game.publisher_id')
      .whereIn(
        'preset.user_id',
        db('friend_of')
          .where('user1_id', req.user.id)
          .select('user2_id')
      )
  );
  res.status(200).json(modes);
}

module.exports = {
  findOne,
  findAll,
  create,
  remove,
  findAllPresets,
}
