import Project from '../models/Project';
// import Task from '../models/Task';

class ProjectController {
  async index(req, res) {
    const userId = req.user.id;
    const { user } = req;
    try {
      const projectsCompleted = await Project.findAll({
        attributes: ['id', 'title', 'description', 'color', 'delivery_date', 'completed'],
        where: { user_id_fk: userId, completed: 0 },
      });

      const projectsOpen = await Project.findAll({
        attributes: ['id', 'title', 'description', 'color', 'delivery_date', 'completed'],
        where: { user_id_fk: userId, completed: 1 },
      });

      if (!projectsCompleted || !projectsOpen) {
        return res.render('layouts/404');
      }

      return res.render('projects/home', {
        projectsCompleted, user, projectsOpen,
      });
    } catch (e) {
      return res.render('layouts/404', { msg: e });
    }
  }

  async indexCreate(req, res) {
    try {
      const { user } = req;

      return res.render('projects/create', { user });
    } catch (e) {
      return res.render('layouts/404');
    }
  }

  async store(req, res) {
    try {
      const project = await Project.create(req.body);
      if (!project) {
        req.flash('errors', 'Não foi possivel realizar a operação');
        return res.redirect('back');
      }
      req.flash('success', 'Projeto criado');
      return res.redirect('/projects');
    } catch (e) {
      return res.render('layouts/404', { msg: e });
    }
  }

  // async show(req, res) {
  //   try {
  //     const idProject = req.params.id;
  //     const project = await Project.findByPk(idProject, {
  //       attributes: ['id', 'title', 'description', 'color', 'delivery_date', 'completed'],
  //       include: {
  //         model: Task,
  //         attributes: ['id', 'title'],
  //       },
  //     });

  //     if (!project) {
  //       return res.status(400).json({
  //         errors: ['Project does not exist'],
  //       });
  //     }

  //     return res.json({ project });
  //   } catch (e) {
  //     return res.status(400).json({
  //       errors: e.errors.map((err) => err.message),
  //     });
  //   }
  // }

  // async delete(req, res) {
  //   try {
  //     const project = await Project.findByPk(req.params.id);

  //     if (!project) {
  //       return res.status(400).json({
  //         errors: ['Project does not exist'],
  //       });
  //     }

  //     await project.destroy();

  //     return res.json({ success: ['Porject has deleted successfuly!'] });
  //   } catch (e) {
  //     return res.status(400).json({
  //       errors: e.errors.map((err) => err.message),
  //     });
  //   }
  // }

  // async update(req, res) {
  //   try {
  //     if (!req.params.id) {
  //       return res.status(400).json({
  //         errors: ['ID not received'],
  //       });
  //     }

  //     const project = await Project.findByPk(req.params.id);

  //     if (!project) {
  //       return res.status(400).json({
  //         errors: ['Project does not exist'],
  //       });
  //     }

  //     const newProject = await project.update(req.body);

  //     const {
  //       id, title, description, color, delivery_date, completed,
  //     } = newProject;
  //     return res.json({
  //       id, title, description, color, delivery_date, completed,
  //     });
  //   } catch (e) {
  //     return res.status(400).json({
  //       errors: e.errors.map((err) => err.message),
  //     });
  //   }
  // }
}

export default new ProjectController();
