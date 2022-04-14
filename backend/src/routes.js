import { Router } from 'express';
import game from './controllers/game.js';
import editor from './controllers/editor.js';
import * as auth from './controllers/auth.js';
import ensureAuthenticated from './middlewares/ensureAuthenticated.js';
import safeUser from './utils/safeUser.js';

const router = Router();

// GET /
router.get('/', (_req, res) => {
  res.send("Welcome to OpenGaming! There's nothing here...", 200);
});

// Authentication
router.post('/auth/login', auth.login, (req, res) => res.status(200).json(safeUser(req.user)));
router.post('/auth/register', auth.register)
router.get('/auth/me', ensureAuthenticated, (req, res) => res.status(200).json(safeUser(req.user)));
router.post('/auth/logout', ensureAuthenticated, auth.logout);

// Game CRUD
router.route('/games')
  .get(game.findAll)
  .post(ensureAuthenticated, game.create);
router.route('/games/:id')
  .get(game.findOne)
  .patch(ensureAuthenticated, game.update)
  .delete(ensureAuthenticated, game.remove);

// Game CRUD
router.route('/editors')
  .get(editor.findAll)
  .post(ensureAuthenticated, editor.create);
router.route('/editors/:id')
  .get(editor.findOne)
  .patch(ensureAuthenticated, editor.update)
  .delete(ensureAuthenticated, editor.remove);

export default router;
