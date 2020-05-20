import { Router } from 'express';
import loginController from '../../controllers/LoginController';

const router = new Router();

router.post('/', loginController.store);
router.get('/', loginController.index);

export default router;
