import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add a book to cart
router.post('/addToCart/:_id', userAuth, cartController.addBook)

export default router;