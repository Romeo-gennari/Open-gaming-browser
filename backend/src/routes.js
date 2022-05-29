const { Router } = require('express');
const editor = require('./controllers/editor.js');
const game = require('./controllers/game.js');
const publisher = require('./controllers/publisher.js');
const friend = require('./controllers/friends.js');
const user = require('./controllers/users.js');
const preset = require('./controllers/presets.js');
const gameMode = require('./controllers/game_mode.js');
const auth = require('./controllers/auth.js');
const ensureAuthenticated = require('./middlewares/ensureAuthenticated.js');
const safeUser = require('./utils/safeUser.js');

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

// Editor CRUD
router.route('/editors')
  .get(editor.findAll)
  .post(ensureAuthenticated, editor.create);
router.route('/editors/:id')
  .get(editor.findOne)
  .patch(ensureAuthenticated, editor.update)
  .delete(ensureAuthenticated, editor.remove);

// Publisher CRUD
router.route('/publishers')
  .get(publisher.findAll)
  .post(ensureAuthenticated, publisher.create);
router.route('/publishers/:id')
  .get(publisher.findOne)
  .patch(ensureAuthenticated, publisher.update)
  .delete(ensureAuthenticated, publisher.remove);

// Friends CRUD
router.route('/friends')
  .get(ensureAuthenticated, friend.findAll)
  .post(ensureAuthenticated, friend.create);
router.route('/friends/presets')
  .get(ensureAuthenticated, friend.findAllPresets);
router.route('/friends/:id')
  .get(ensureAuthenticated, friend.findOne)
  .delete(ensureAuthenticated, friend.remove);

// Presets CRUD
router.route('/presets')
  .get(ensureAuthenticated, preset.findAll)
  .post(ensureAuthenticated, preset.create);
router.route('/presets/:id')
  .get(ensureAuthenticated, preset.findOne)
  .patch(ensureAuthenticated, preset.update)
  .delete(ensureAuthenticated, preset.remove);

router.route('/presets/:presetId/modes')
  .get(ensureAuthenticated, preset.findAllModes);
router.route('/presets/:presetId/modes/:gameModeId')
  .put(ensureAuthenticated, preset.addMode)
  .delete(ensureAuthenticated, preset.removeMode);

// Game Modes CRUD
router.route('/gamemodes')
  .get(gameMode.findAll)
  .post(ensureAuthenticated, gameMode.create);
router.route('/gamemodes/:id')
  .get(gameMode.findOne)
  .patch(ensureAuthenticated, gameMode.update)
  .delete(ensureAuthenticated, gameMode.remove);

// Users
router.route('/users')
  .get(user.findAll);
router.route('/users/:userId')
  .patch(ensureAuthenticated, user.update);

module.exports = router;
