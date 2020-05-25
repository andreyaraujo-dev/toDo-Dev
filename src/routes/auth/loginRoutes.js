import { Router } from 'express';
import passport from 'passport';
import loginController from '../../controllers/LoginController';
import { forwardAuthenticated } from '../../middlewares/authentication';

const router = new Router();

router.get('/', forwardAuthenticated, loginController.index);
router.post('/', passport.authenticate('local', {
  successRedirect: '/dashboard/',
  failureRedirect: '/login/',
  failureFlash: true,
}));

export default router;
