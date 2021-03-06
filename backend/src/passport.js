const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('./database.js');

passport.use('local', new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  (emailOrUsername, password, done) => {
    db('user')
      .where('email', emailOrUsername.toLowerCase())
      .orWhere('username', emailOrUsername.toLowerCase())
      .first()
      .then(async (user) => {
        if (!user)
          return done(null, null, { message: `No user found for ${emailOrUsername}` });

        // If the password is the same, then go forward
        if (await bcrypt.compare(password, user.password))
          return done(null, user);
        return done(null, null, { message: 'Incorrect password' });
      });
  }));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  db('user')
    .where('id', id)
    .first()
    .then(user => done(null, user))
    .catch(err => done(err));
});
