import HttpStatus from 'http-status-codes';
import * as bookService from '../services/book.service';

/**
 * Controller to create a new book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const newBook = async(req, res, next) => {
    try {
        const data = await bookService.newBook(req.body);
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
 * Controller to get all books
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const getAllBooks = async(req, res, next) => {
    try {
        const data = await bookService.getAllBooks();
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Books fetched successfully'
        });
    } catch (error) {
        next(error)
    }
};

/**
 * Controller to get a single book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const getBook = async(req, res, next) => {
    try {
        const data = await bookService.getBook(req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Book fetched successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to update a single book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const updateBook = async(req, res, next) => {
    try {
        const data = await bookService.updateBook(req.params._id, req.body);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Book updated successfully'
        });
    } catch (error) {
        next(error);
    }
};