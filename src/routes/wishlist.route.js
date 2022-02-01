import express from 'express';
import * as wishlistController from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add a book to wishlist
router.post('/:_id', userAuth, wishlistController.addBook)

//route to remove a book from wishlist
router.put('/:_id', userAuth, wishlistController.removeBook)

export default router;