import { Router } from 'express';
import game from '../controllers/game';

const router = Router();

// GET /
router.get('/', (_req, res) => {
  res.send("Welcome to OpenGaming! There's nothing here...", 200);
});

// Game CRUD
router.route('/games')
  .get(game.findAll)
  .post(game.create);
router.route('/games/:id')
  .get(game.findOne)
  .patch(game.update)
  .delete(game.remove);

export default router;
