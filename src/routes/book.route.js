import express from 'express';
import * as bookController from '../controllers/book.controller';
import { newBookValidator } from '../validators/book.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add a new book
router.post('', newBookValidator, userAuth, bookController.newBook)

export default router;