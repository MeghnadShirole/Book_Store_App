import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import * as role from '../middlewares/role.middleware';
import { resetPasswordAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new admin
router.post('/adminRegistration', newUserValidator, role.setAdmin, userController.newUser);

//route to create a new user
router.post('/userRegistration', newUserValidator, role.setUser, userController.newUser);

//route for admin login
router.post('/adminLogin', role.checkAdmin, userController.login);

//route for user login
router.post('/userLogin', role.checkUser, userController.login);

//route for forget password
router.post('/forgetPassword', userController.forgetPassword);

//route for reset password
router.post('/resetPassword/:token', resetPasswordAuth, userController.resetPassword);


export default router;