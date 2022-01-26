import express from 'express';
import * as bookController from '../controllers/book.controller';
import { newBookValidator } from '../validators/book.validator';
import { adminAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add a new book
router.post('', newBookValidator, adminAuth, bookController.newBook)

export default router;