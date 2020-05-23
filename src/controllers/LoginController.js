import jwt from 'jsonwebtoken';
import User from '../models/User';

class LoginController {
  index(req, res) {
    res.render('auth/login', { errors: [], success: [] });
  }

  async store(req, res) {
    const { username = '', password = '' } = req.body;

    if (!username || !password) {
      return res.render('auth/login', { errors: ['invalid credentials'] });
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.render('auth/login', { errors: ['User does not exist'] });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.render('auth/login', { errors: ['invalid password'] });
    }

    const { id } = user;
    const token = jwt.sign({ id, username }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.render('home', { auth: true, token });
  }
}

export default new LoginController();
