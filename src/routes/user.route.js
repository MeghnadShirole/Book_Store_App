import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import * as setRole from '../middlewares/role.middleware';

const router = express.Router();

//route to create a new admin
router.post('/registerAdmin', newUserValidator, setRole.admin, userController.newUser);

export default router;