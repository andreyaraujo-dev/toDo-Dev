import Project from '../models/Project';
import Task from '../models/Task';

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

  async show(req, res) {
    try {
      const { user } = req;
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

      const tasksCompletedCount = await Task.findAndCountAll({
        where: { completed: 0, id_project_fk: idProject },
      });
      const tasksPendingCount = await Task.findAndCountAll({
        where: { completed: 1, id_project_fk: idProject },
      });

      const tasksCompleted = await Task.findAll({
        where: {
          id_project_fk: idProject,
          completed: 0,
        },
      });

      const tasksPending = await Task.findAll({
        where: {
          id_project_fk: idProject,
          completed: 1,
        },
      });

      return res.render('projects/show', {
        project, user, tasksCompletedCount, tasksPendingCount, tasksCompleted, tasksPending,
      });
    } catch (e) {
      return res.render('layouts/404', { msg: e });
    }
  }

  async edit(req, res) {
    try {
      const { user } = req;
      const idProject = req.params.id;
      const project = await Project.findByPk(idProject, {
        attributes: ['id', 'title', 'description', 'color', 'delivery_date', 'completed'],
      });

      if (!project) {
        return res.status(400).json({
          errors: ['Project does not exist'],
        });
      }

      return res.render('projects/edit', {
        project, user,
      });
    } catch (e) {
      return res.render('layouts/404', { msg: e });
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

      req.flash('success', 'Porject has deleted successfuly!');
      return res.redirect('/projects');
    } catch (e) {
      return res.render('layouts/404', { msg: e });
    }
  }

  async update(req, res) {
    try {
      const { id_project_fk } = req.body;
      const project = await Project.findByPk(id_project_fk);

      if (!project) {
        return res.status(400).json({
          errors: ['Project does not exist'],
        });
      }

      const newProject = await project.update(req.body);

      if (!newProject) {
        return res.render('projects/show', { errors: 'Não foi possível atualizar!' });
      }

      req.flash('success', 'Projeto atualizado com sucesso');
      return res.redirect(`/projects/details/${newProject.id}`);
    } catch (e) {
      return res.render('layouts/404', { msg: e });
    }
  }
}

export default new ProjectController();
