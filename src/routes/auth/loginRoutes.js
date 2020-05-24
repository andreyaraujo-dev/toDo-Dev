import { Router } from 'express';
import passport from 'passport';
import loginController from '../../controllers/LoginController';

const router = new Router();

router.get('/', loginController.index);
router.post('/', passport.authenticate('local', {
  successRedirect: '/dashboard/',
  failureRedirect: '/login',
  failureFlash: true,
}));

export default router;
