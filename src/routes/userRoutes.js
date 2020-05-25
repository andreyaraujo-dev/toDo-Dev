import { Router } from 'express';
import userController from '../controllers/UserController';
import { ensureAuthenticated } from '../middlewares/authentication';

const router = new Router();

router.post('/', userController.store);
router.put('/', ensureAuthenticated, userController.update);
router.get('/perfil', ensureAuthenticated, userController.show);
router.delete('/', ensureAuthenticated, userController.delete);

export default router;
