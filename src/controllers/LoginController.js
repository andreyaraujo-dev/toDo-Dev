import jwt from 'jsonwebtoken';
import User from '../models/User';

class LoginController {
  async store(req, res) {
    const { username = '', password = '' } = req.body;

    if (!username || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário não existe'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, username }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ auth: true, token });
  }
}

export default new LoginController();
