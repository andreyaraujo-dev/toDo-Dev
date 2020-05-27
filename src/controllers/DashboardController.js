import sequelize from 'sequelize';
import Task from '../models/Task';

class DashboardController {
  async index(req, res) {
    const userId = req.user.id;
    const { user } = req;
    try {
      const dateNow = new Date();
      const date = {};
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      date.day = days[dateNow.getDay()];
      date.dayNumber = dateNow.getDate();
      date.month = months[dateNow.getMonth()];
      date.year = dateNow.getFullYear();

      const tasksCompleted = await Task.findAndCountAll({
        where: { completed: 0, id_user_fk: userId },
      });
      const tasksPending = await Task.findAndCountAll({
        where: { completed: 1, id_user_fk: userId },
      });
      const tasks = await Task.sequelize.query('SELECT * FROM tasks WHERE YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)',
        { type: sequelize.QueryTypes.SELECT });

      return res.render('dashboard', {
        user, tasksCompleted, tasksPending, date, tasks,
      });
    } catch (e) {
      return res.render('404', req.flash('errors', 'Não foi posspivel contar as tarefas'));
    }
  }
}

export default new DashboardController();
