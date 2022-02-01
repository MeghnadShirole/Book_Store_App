import HttpStatus from 'http-status-codes';
import * as cartService from '../services/cart.service';

/**
 * Controller to create a new book
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