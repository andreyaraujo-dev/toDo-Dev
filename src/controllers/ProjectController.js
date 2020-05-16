import Project from '../models/Project';

class ProjectController {
  async store(req, res) {
    try {
      const newProject = await Project.create(req.body);
      const {
        id, title, description, color, delivery_date, completed, user_id_fk,
      } = newProject;
      return res.json({
        id, title, description, color, delivery_date, completed, user_id_fk,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const project = await Project.findByPk(req.params.id);

      if (!project) {
        return res.status(400).json({
          errors: ['Projeto não existe'],
        });
      }

      const {
        id, title, description, color, delivery_date, completed, user_id_fk,
      } = project;
      return res.json({
        id, title, description, color, delivery_date, completed, user_id_fk,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ProjectController();
