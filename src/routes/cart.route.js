import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add a book to cart
router.post('/addToCart/:_id', userAuth, cartController.addBook)

//route to remove a book from cart
router.post('/removeFromCart/:_id', userAuth, cartController.removeBook)

//route to get cart for user
router.get('', userAuth, cartController.getCart)

//route to modify cart if book is purchased
router.put('/isPurchased', userAuth, cartController.bookPruchased)
export default router;