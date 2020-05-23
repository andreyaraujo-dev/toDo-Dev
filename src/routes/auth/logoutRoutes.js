import { Router } from 'express';
import logoutController from '../../controllers/LogoutController';
// import loginRequired from '../../middlewares/loginRequired';

const router = new Router();

router.post('/', logoutController.logout);

export default router;
