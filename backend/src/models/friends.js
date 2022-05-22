const { z } = require('zod');

const createFriends = z.object({
  user2_id: z.number().int().gt(0),
  friend_group: z.string().nonempty(),
}).strict();

module.exports = { createFriends };
