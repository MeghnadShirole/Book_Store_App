import HttpStatus from 'http-status-codes';
import * as cartService from '../services/cart.service';

/**
 * Controller to add a book in the cart
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const addBook = async(req, res, next) => {
    try {
        const data = await cartService.addBook(req.params._id, req.body);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Book added successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to remove a book from
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const removeBook = async(req, res, next) => {
    try {
        const data = await cartService.removeBook(req.params._id, req.body);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Book removed successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to the get the cart for user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const getCart = async(req, res, next) => {
    try {
        const data = await cartService.getCart(req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Cart fetched successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller for modifying cart if book purchased
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const bookPruchased = async(req, res, next) => {
    try {
        const data = await cartService.bookPurchased(req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Order placed successfully'
        });
    } catch (error) {
        next(error);
    }
};