import express from 'express';
import * as wishlistController from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add a book to wishlist
router.post('/:_id', userAuth, wishlistController.addBook)

export default router;