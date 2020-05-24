import { Router } from 'express';
import homeController from '../controllers/HomeController';
import authenticated from '../middlewares/authentication';

const router = new Router();

router.get('/', authenticated, homeController.index);

export default router;
