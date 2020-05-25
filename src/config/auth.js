import User from '../models/User';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  console.log('------SerializeUser: ', user);
  return done(null, user.id);
});

// eslint-disable-next-line consistent-return
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    console.log('-------DeserializeUser: ', user);
    return done(null, user);
  } catch (e) {
    done(e);
  }
});

passport.use(new LocalStrategy({ passReqToCallback: true },
  async (req, username, password, done) => {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return done(null, false, { message: req.flash('errors', 'Usuario não existe') });
    }
    if (!(await user.passwordIsValid(password))) {
      return done(null, false, { message: req.flash('errors', 'Senha incorreta') });
    }
    console.log(user);
    return done(null, user);
  }));

module.exports = passport;
