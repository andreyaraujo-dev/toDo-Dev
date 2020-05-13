import { Router } from 'express';
import logoutController from '../../controllers/LogoutController';
import loginRequired from '../../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, logoutController.logout);

export default router;
