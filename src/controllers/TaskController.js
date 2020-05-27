import sequelize from 'sequelize';
import Task from '../models/Task';
import Project from '../models/Project';

class TaskController {
  async index(req, res) {
    try {
      const userId = req.user.id;
      const { user } = req;
      const allTasks = await Task.findAll({
        attributes: ['id', 'title', 'description', 'notes', 'delivery_date', 'completed'],
        where: { id_user_fk: userId },
        include: {
          model: Project,
          attributes: ['id', 'title'],
        },
      });

      const weekTasks = await Task.sequelize.query('SELECT * FROM tasks WHERE YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)',
        { type: sequelize.QueryTypes.SELECT });

      if (!allTasks || !weekTasks) {
        return res.render('layouts/404');
      }

      return res.render('tasks/home', { user, allTasks, weekTasks });
    } catch (e) {
      return res.status(401).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async indexCreate(req, res) {
    const userId = req.user.id;
    const { user } = req;
    try {
      const projects = await Project.findAll({
        where: {
          user_id_fk: userId,
        },
      });
      console.log(projects);
      return res.render('tasks/create', { projects, user });
    } catch (e) {
      return res.render('layouts/404');
    }
  }

  async store(req, res) {
    try {
      const task = await Task.create(req.body);

      if (!task) {
        req.falsh('errors', 'The task could not be created');
        return res.redirect('back');
      }

      req.flash('success', 'Task created');
      return res.redirect('/tasks');
    } catch (e) {
      return res.render('layouts/404', req.flash('errors', 'Não foi possivel inserir a tarefa'));
    }
  }

  async update(req, res) {
    try {
      const task = await Task.findByPk(req.params.id);

      if (!task) {
        return res.status(401).json({
          errors: ['Task does not exist'],
        });
      }

      const newTask = await task.update(req.body);

      const {
        id, title, description, notes, delivery_date, completed, id_project_fk,
      } = newTask;

      return res.json({
        id, title, description, notes, delivery_date, completed, id_project_fk,
      });
    } catch (e) {
      return res.status(401).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const idTask = req.params.id;
      const task = await Task.findByPk(idTask, {
        attributes: ['id', 'title', 'description', 'notes', 'delivery_date', 'completed'],
        include: {
          model: Project,
          attributes: ['id', 'title'],
        },
      });

      if (!task) {
        return res.status(401).json({
          errors: ['Task does not exist'],
        });
      }

      return res.json({ task });
    } catch (e) {
      return res.status(401).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const task = await Task.findByPk(req.params.id);

      if (!task) {
        return res.status(401).json({
          errors: ['Task does not exist'],
        });
      }

      await task.destroy();

      return res.json(null);
    } catch (e) {
      return res.status(401).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new TaskController();
