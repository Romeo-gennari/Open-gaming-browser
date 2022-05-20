import { z } from 'zod';

export const createFriends = z.object({
  user2_id: z.number().int().gt(0),
  friend_group: z.string().nonempty(),
}).strict();
