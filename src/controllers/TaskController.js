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

      const weekTasks = await Task.sequelize.query(`SELECT * FROM tasks WHERE
      YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1) AND id_user_fk = ${userId}`,
      { type: sequelize.QueryTypes.SELECT });

      if (!allTasks || !weekTasks) {
        return res.render('layouts/404');
      }
      return res.render('tasks/home', { user, allTasks, weekTasks });
    } catch (e) {
      return res.render('layouts/404', { msg: e });
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
      const task = await Task.findByPk(req.body.id);

      if (!task) {
        const msg = req.flash('errors', 'Task does not exists');
        return res.render('layouts/404', { msg });
      }

      await task.update(req.body);

      req.flash('success', 'Tarefa atualizada');
      return res.redirect('/tasks');
    } catch (e) {
      const msg = req.flash('errors', e);
      return res.render('layouts/404', { msg });
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

  async edit(req, res) {
    try {
      const userId = req.user.id;
      const { user } = req;
      const idTask = req.params.id;
      const task = await Task.findOne({
        where: {
          id: idTask,
        },
        include: [
          {
            model: Project,
          },
        ],
      });
      if (!task) {
        req.flash('errors', 'Task does not exists');
        return res.render('layouts/404');
      }

      const projects = await Project.findAll({
        where: {
          user_id_fk: userId,
        },
      });

      const dateTask = new Date(task.delivery_date);
      const day = dateTask.getDate();
      const month = dateTask.getMonth() + 1;
      const year = dateTask.getFullYear();
      const newDate = `${year}-${month}-${day}`;

      return res.render('tasks/edit', {
        task, projects, user, newDate,
      });
    } catch (e) {
      // const msg = req.flash('errors', e);
      return res.render('layouts/404', { msg: e });
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

      req.flash('success', 'Task deleted');
      return res.redirect('/tasks/');
    } catch (e) {
      return res.status(401).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async finishTask(req, res) {
    try {
      const idTask = req.params.id;
      console.log('------------------');
      console.log(idTask);
      console.log('-------------------');
      const task = await Task.findByPk(idTask);
      const newTask = await task.update({ completed: '0' });
      console.log(newTask);
      console.log('----------------------');
      if (!task) {
        req.falsh('errors', 'Não foi possivel realizar a operação');
        return res.redirect('/tasks/');
      }

      req.flash('success', 'Tarefa finalizada');
      return res.redirect('/tasks/');
    } catch (e) {
      req.flash('errors', e);
      return res.render('layouts/404');
    }
  }
}

export default new TaskController();
