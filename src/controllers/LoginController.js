import jwt from 'jsonwebtoken';
import User from '../models/User';

class LoginController {
  index(req, res) {
    res.render('auth/login');
  }

  async store(req, res) {
    const { username = '', password = '' } = req.body;

    if (!username || !password) {
      req.flash('errors', 'invalid credentials');
      return req.session.save(() => res.redirect('/login/'));
      // return res.render('auth/login', { errors: ['invalid credentials'] });
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      req.flash('errors', 'User does not exist');
      return req.session.save(() => res.redirect('/login/'));
      // return res.render('auth/login', { errors: ['User does not exist'] });
    }

    if (!(await user.passwordIsValid(password))) {
      req.flash('errors', 'invalid password');
      return req.session.save(() => res.redirect('/login/'));
      // return res.render('auth/login', { errors: ['invalid password'] });
    }

    const { id } = user;
    const token = jwt.sign({ id, username }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    // caso o login seja feito com sucesso cria uma flash message com a mensagem de sucesso e
    // redireciona para a home
    // req.session.user = user.username;
    // req.session.token = token;
    // req.session.save(() => res.redirect('/dashboard/'));

    return res.render('home', { auth: true, token, userName: username });
  }
}

export default new LoginController();
