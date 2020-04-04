const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;

const User = require('../models/user.model');
const config = require('./config');

const localLogin = new LocalStrategy({
  usernameField: 'email',
}, async (email, password, done) => {
  let user = await User.findOne({ email });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return done(null, false, { error: 'Invalid login credentials' });
  }

  user = user.toObject();

  delete user.password;

  return done(null, user);
});

const jwtLogin = new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
}, async (payload, done) => {
  let user = await User.findById(payload._id);

  if (!user) {
    return done(null, false);
  }

  user = user.toObject();
  delete user.password;

  return done(null, user);
});

passport.use(jwtLogin);
passport.use(localLogin);

module.exports = passport;
