import { Router } from 'express';
import projectController from '../controllers/ProjectController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, projectController.store);
// router.put('/', loginRequired, projectController.update);
router.get('/:id', loginRequired, projectController.show);
// router.delete('/', loginRequired, projectController.delete);

export default router;
