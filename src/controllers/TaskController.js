import Task from '../models/Task';
import Project from '../models/Project';

class TaskController {
  async index(req, res) {
    try {
      const tasks = await Task.findAll({
        attributes: ['id', 'title', 'description', 'notes', 'delivery_date', 'completed'],
        where: { id_user_fk: req.userId },
        include: {
          model: Project,
          attributes: ['id', 'title'],
        },
      });

      if (!tasks) {
        return res.status(400).json({
          errors: ['Tasks does not exist'],
        });
      }

      return res.json({ tasks });
    } catch (e) {
      return res.status(401).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const task = await Task.create(req.body);

      if (!task) {
        return res.status(401).json({
          errors: ['Unable to register'],
        });
      }

      const {
        id, title, description, notes, delivery_date, completed, id_project_fk,
      } = task;

      return res.json({
        id, title, description, notes, delivery_date, completed, id_project_fk,
      });
    } catch (e) {
      return res.status(401).json({
        errors: e.errors.map((err) => err.message),
      });
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
