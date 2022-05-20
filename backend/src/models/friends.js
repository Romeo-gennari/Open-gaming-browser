import { z } from 'zod';
import * as n from 'nested-knex';
import { userShape } from './user.js';

export const createFriends = z.object({
    user2_id: z.number().int().gt(0),
    friend_group: z.string().nonempty(),
}).strict();

export const friendShape = n.type({
    user1 : n.type({
        id: n.number('user.id', { id: true }),
        username: n.string('user.username'),
        email: n.string('user.email'),
      }),
    //user2 : userShape,
    friendGroup : n.string("friend_group")
});

export const friendsShape = n.array(friendShape);