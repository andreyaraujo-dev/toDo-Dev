import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import taksController from '../controllers/TaskController';

const router = new Router();

router.get('/', loginRequired, taksController.index);
router.post('/', loginRequired, taksController.store);
router.put('/:id', loginRequired, taksController.update);
router.get('/:id', loginRequired, taksController.show);
router.delete('/:id', loginRequired, taksController.delete);

export default router;
