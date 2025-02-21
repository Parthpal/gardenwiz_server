import express from 'express';
import { AuthControllers } from './Auth.controller';
import { validateRequest, validateRequestCookies } from '../../middlewares/validateRequest';
import { AuthValidation } from './Auth.validation';
import { auth } from '../../middlewares/Auth';
import { USER_ROLE } from '../User/user.constant';

const router=express.Router();

router.post('/register',AuthControllers.registerUser)
router.post('/login',validateRequest(AuthValidation.loginValidationSchema),AuthControllers.loginUser)
router.post('/change-password',auth(USER_ROLE.USER),validateRequest(AuthValidation.passwordValidationSchema),AuthControllers.changePasswordC)
router.post(
    '/refresh-token',
    validateRequestCookies(AuthValidation.refreshTokenValidationSchema),
    AuthControllers.refreshTokenC
  );
  router.post(
    '/forget-password',
    // validateRequest(AuthValidation.forgetPasswordValidationSchema),
    AuthControllers.forgetPasswordC
  );
  router.post(
    '/reset-password',
    // validateRequest(AuthValidation.resetPasswordValidationSchema),
    AuthControllers.resetPasswordC
  );
export const authRoutes=router;