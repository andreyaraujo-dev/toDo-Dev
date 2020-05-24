import LocalStrategy from 'passport-local';
import User from '../models/User';

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    await User.findByPk(id, (err, user) => {
      done(err, user);
    });
  });

  async function findUser(username, callback) {
    await User.findOne({ where: { username } });
  }

  passport.use(new LocalStrategy({ passReqToCallback: true },
    async (req, username, password, done) => {
      findUser(username, async (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        if (!(await user.passwordIsValid(password))) {
          if (err) return done(err);
        }
        return done(null, user);
      });
    }));
};
