import express from 'express';
import * as bookController from '../controllers/book.controller';
import { newBookValidator } from '../validators/book.validator';
import { adminAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add a new book
router.post('', newBookValidator, adminAuth, bookController.newBook)

//route to get all books
router.get('', bookController.getAllBooks);

//route to get a single book by their book id
router.get('/:_id', bookController.getBook);

//route to update a single book by their book id
router.put('/:_id', adminAuth, bookController.updateBook);

export default router;