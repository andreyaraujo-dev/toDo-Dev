import { Router } from 'express';
import projectController from '../controllers/ProjectController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, projectController.store);
router.put('/:id', loginRequired, projectController.update);
router.get('/:id', loginRequired, projectController.show);
router.get('/', loginRequired, projectController.index);
router.delete('/:id', loginRequired, projectController.delete);

export default router;
