import { Router } from 'express';
import dashboardController from '../controllers/DashboardController';
import { ensureAuthenticated } from '../middlewares/authentication';

const router = new Router();

router.get('/', ensureAuthenticated, dashboardController.index);

export default router;
