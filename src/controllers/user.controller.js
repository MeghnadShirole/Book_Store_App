import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = (req, res, next) => {
    try {
        const data = UserService.registration(req.body);
        data.then(result => res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: result,
            message: 'User created successfully'
        }));
    } catch (error) {
        next(error);
    }
};