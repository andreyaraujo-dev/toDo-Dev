import { Router } from 'express';
import projectController from '../controllers/ProjectController';
import { ensureAuthenticated } from '../middlewares/authentication';


const router = new Router();

router.post('/', ensureAuthenticated, projectController.store);
router.put('/:id', ensureAuthenticated, projectController.update);
router.get('/:id', ensureAuthenticated, projectController.show);
router.get('/', ensureAuthenticated, projectController.index);
router.delete('/:id', ensureAuthenticated, projectController.delete);

export default router;
