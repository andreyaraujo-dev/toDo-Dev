import { Router } from 'express';
import userController from '../controllers/UserController';
import { ensureAuthenticated } from '../middlewares/authentication';

const router = new Router();

router.post('/', userController.store);
router.get('/edit', ensureAuthenticated, userController.edit);
router.post('/update', ensureAuthenticated, userController.update);
router.get('/perfil', ensureAuthenticated, userController.show);
router.post('/delete', ensureAuthenticated, userController.delete);

export default router;
