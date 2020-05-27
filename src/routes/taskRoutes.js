import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/authentication';
import tasksController from '../controllers/TaskController';

const router = new Router();

router.get('/', ensureAuthenticated, tasksController.index);
router.get('/create', ensureAuthenticated, tasksController.indexCreate);
router.post('/create', ensureAuthenticated, tasksController.store);
router.put('/:id', ensureAuthenticated, tasksController.update);
router.get('/:id', ensureAuthenticated, tasksController.show);
router.delete('/:id', ensureAuthenticated, tasksController.delete);

export default router;
