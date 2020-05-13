import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', userController.store);
router.put('/', loginRequired, userController.update);
router.get('/', loginRequired, userController.show);
router.delete('/', loginRequired, userController.delete);

export default router;
