import Project from '../models/Project';
import Task from '../models/Task';

class ProjectController {
  async index(req, res) {
    try {
      const idUsuario = req.userId;
      const project = await Project.findAll({
        attributes: ['id', 'title', 'description', 'color', 'delivery_date', 'completed'],
        where: { user_id_fk: idUsuario },
        include: {
          model: Task,
          attributes: ['id', 'title'],
        },
      });

      if (!project) {
        return res.status(400).json({
          errors: ['Project does not exist'],
        });
      }

      return res.json({
        project,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const newProject = await Project.create(req.body);
      const {
        id, title, description, color, delivery_date, completed,
      } = newProject;
      return res.json({
        id, title, description, color, delivery_date, completed,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const idProject = req.params.id;
      const project = await Project.findByPk(idProject, {
        attributes: ['id', 'title', 'description', 'color', 'delivery_date', 'completed'],
        include: {
          model: Task,
          attributes: ['id', 'title'],
        },
      });

      if (!project) {
        return res.status(400).json({
          errors: ['Project does not exist'],
        });
      }

      return res.json({ project });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const project = await Project.findByPk(req.params.id);

      if (!project) {
        return res.status(400).json({
          errors: ['Project does not exist'],
        });
      }

      await project.destroy();

      return res.json({ success: ['Porject has deleted successfuly!'] });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID not received'],
        });
      }

      const project = await Project.findByPk(req.params.id);

      if (!project) {
        return res.status(400).json({
          errors: ['Project does not exist'],
        });
      }

      const newProject = await project.update(req.body);

      const {
        id, title, description, color, delivery_date, completed,
      } = newProject;
      return res.json({
        id, title, description, color, delivery_date, completed,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ProjectController();
