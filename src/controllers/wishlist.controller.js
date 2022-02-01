import HttpStatus from 'http-status-codes';
import * as wishlistService from '../services/wishlist.service';

/**
 * Controller to add a book in the wishlist
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const addBook = async(req, res, next) => {
    try {
        const data = await wishlistService.addBook(req.params._id, req.body, res);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Book added to wishlist'
        });
    } catch (error) {
        next(error);
    }
};