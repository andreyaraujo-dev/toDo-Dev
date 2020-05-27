import User from '../models/User';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => done(null, user.id));

// eslint-disable-next-line consistent-return
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    return done(null, user);
  } catch (e) {
    done(e);
  }
});

passport.use(new LocalStrategy({ passReqToCallback: true },
  async (req, username, password, done) => {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return done(null, false, { message: req.flash('errors', 'User does not exist') });
    }
    if (!(await user.passwordIsValid(password))) {
      return done(null, false, { message: req.flash('errors', 'Incorrect password') });
    }
    return done(null, user);
  }));

module.exports = passport;
