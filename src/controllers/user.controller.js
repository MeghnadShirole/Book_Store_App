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

/**
 * Controller for login
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const login = (req, res, next) => {
    try {
        UserService.login(req.body, (error, result) => {
            if (error) {
                return res.status(HttpStatus.UNAUTHORIZED).send({
                    code: HttpStatus.UNAUTHORIZED,
                    error: error,
                    message: 'Invalid Username or Password'
                });
            } else {
                return res.status(HttpStatus.OK).send({
                    code: HttpStatus.OK,
                    data: result,
                    message: 'Logged Successful'
                });
            }
        })
    } catch (error) {
        next(error);
    }
}

/**
 * Controller for forget password
 * @param  {object} req - request object
 * @param {object} res - response object
 */
export const forgetPassword = (req, res) => {
    try {
        UserService.forgetPassword(req.body, (err, result) => {
            if (err) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                    code: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: err,
                    message: 'could not send a mail'
                });
            } else {
                return res.status(HttpStatus.OK).send({
                    code: HttpStatus.OK,
                    data: result,
                    message: 'mail sent to your registerd email Id'
                });
            }
        })
    } catch (err) {
        res.send(err);
    }
}