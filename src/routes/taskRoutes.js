import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/authentication';
import tasksController from '../controllers/TaskController';

const router = new Router();

router.get('/', ensureAuthenticated, tasksController.index);
router.get('/create', ensureAuthenticated, tasksController.indexCreate);
router.post('/create', ensureAuthenticated, tasksController.store);
router.get('/edit/:id', ensureAuthenticated, tasksController.edit);
router.post('/edit', ensureAuthenticated, tasksController.update);
router.get('/:id', ensureAuthenticated, tasksController.show);
router.post('/delete/:id', ensureAuthenticated, tasksController.delete);
router.post('/finish/:id', ensureAuthenticated, tasksController.finishTask);

export default router;
