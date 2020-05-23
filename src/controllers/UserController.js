import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      await User.create(req.body);
      req.flash('success', 'Your account was created');
      return req.session.save(() => res.redirect('/login/'));
    } catch (e) {
      req.flash('errors', e);
      return req.session.save(() => res.redirect('/login/'));
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['User does not exist'],
        });
      }

      const novosDados = await user.update(req.body);
      const {
        id, name, username, email,
      } = novosDados;
      return res.json({
        id, name, username, email,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['User does not exist'],
        });
      }

      const {
        id, name, username, email, bio, created_at,
      } = user;
      return res.json({
        id, name, username, email, bio, created_at,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['User does not exist'],
        });
      }

      await user.destroy();
      return res.json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
