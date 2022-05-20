import db from '../database.js';
import duplicateHandler from '../utils/duplicateHandler.js';
import { createFriends, friendShape } from '../models/friends.js';
import notFoundHandler from '../utils/notFoundHandler.js';

async function fetchFriend(id1, id2) {
  return await friendShape.withQuery(
    db('friend_of')
    .where('user1_id', id1)
    .where('user2_id', id2)
    .leftJoin('user as user1', 'friend_of.user1_id', 'user1.id')
    //.leftJoin('user as u2', 'friend_of.user2_id', 'u2.id')
    .first()
  ).catch(notFoundHandler);
}

/**
 * Find a specific friend, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
 export async function findOne(req, res) {
  const id = req.params.id;
  const friend = await db('friend_of').where('user2_id', id).first();
  if (!friend)
    res.status(404).json({ message: 'Friend not found' });
  res.status(200).json(friend);
}

/**
 * Find all friends
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
 export async function findAll(_req, res) {
    const friends = await db('friend_of').select();
    res.status(200).json(friends);
  }

/**
 * Create a new friend
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function create(req, res, next) {
  // Parse the given body to check if it contain a valid editor data
  const { success, data, error } = createFriends.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  console.log(data);

  // Check if the user2 exists
  const user2 = await db('user').where('id', data.user2_id).first();
  if (!user2) {
    res.status(400).json({ message: 'User not found' });
    return;
  }

  // Insert the new friend in the database
  const insertResult = await db('friend_of')
    .returning(['user1_id', 'user2_id'])
    .insert({ ...data, user1_id: req.user.id })
    .catch(duplicateHandler('Already your friend', res));
  if (!insertResult)
    return;    

  // Return the newly created friend
  const result = await fetchFriend(insertResult[0].user1_id, insertResult[0].user2_id)

  res.status(201).json(result);
}

/**
 * Delete a friend, with the ID given in the request's parameters
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
 export async function remove(req, res) {
    const id = req.params.id;
    const result = await db('friend_of').where('user2_id', id).del();
    if (result === 0)
      res.status(404).json({ message: 'Friend not found' });
    else
      res.status(204).json();
}

export default {
    findOne, 
    findAll, 
    create,
    remove,
}