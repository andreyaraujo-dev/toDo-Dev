import { Router } from 'express';
import projectController from '../controllers/ProjectController';
import { ensureAuthenticated } from '../middlewares/authentication';


const router = new Router();

router.post('/create', ensureAuthenticated, projectController.store);
router.post('/edit', ensureAuthenticated, projectController.update);
router.get('/edit/:id', ensureAuthenticated, projectController.edit);
router.get('/details/:id', ensureAuthenticated, projectController.show);
router.get('/', ensureAuthenticated, projectController.index);
router.get('/create', ensureAuthenticated, projectController.indexCreate);
router.post('/delete/:id', ensureAuthenticated, projectController.delete);

export default router;
