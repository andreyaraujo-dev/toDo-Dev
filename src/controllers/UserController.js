import User from '../models/User';
import Project from '../models/Project';
import Task from '../models/Task';

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
      const userId = req.user.id;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({
          errors: ['User does not exist'],
        });
      }

      await user.update(req.body);

      req.flash('success', 'You updated your profile');
      return res.redirect('/user/perfil');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    const userId = req.user.id;

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        req.flash('errors', 'User not exists');
        return res.redirect('back');
      }

      const tasksCompleted = await Task.findAndCountAll({
        where: { completed: 0, id_user_fk: userId },
      });
      const projectCompleted = await Project.findAndCountAll({
        where: { completed: 1, user_id_fk: userId },
      });

      const dateNow = new Date(user.created_at);
      const date = {};
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      date.day = days[dateNow.getDay()];
      date.dayNumber = dateNow.getDate();
      date.month = months[dateNow.getMonth()];
      date.year = dateNow.getFullYear();


      return res.render('user/perfil', {
        user, tasksCompleted, projectCompleted, date,
      });
    } catch (e) {
      return res.render('404', req.flash('errors', e));
    }
  }

  async edit(req, res) {
    const userId = req.user.id;

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        req.flash('errors', 'User not exists');
        return res.redirect('back');
      }

      return res.render('user/edit', { user });
    } catch (e) {
      return res.render('404', req.flash('errors', e));
    }
  }

  async delete(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({
          errors: ['User does not exist'],
        });
      }

      await user.destroy();
      req.flash('success', 'Deleted account');
      return res.redirect('/login');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
