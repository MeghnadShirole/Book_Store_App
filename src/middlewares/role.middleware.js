import HttpStatus from 'http-status-codes';
import User from '../models/user.model';

export const setAdmin = (req, res, next) => {
    req.body['role'] = "admin";
    next();
}

export const setUser = (req, res, next) => {
    req.body['role'] = "user";
    next();
}

export const checkAdmin = (req, res, next) => {
    User.findOne({
        "email": req.body.email
    }, (error, result) => {
        if (error) {
            return (error);
        } else if (result != null) {
            const role = result.role;
            if (role == "admin") {
                next();
            } else {
                res.status(HttpStatus.UNAUTHORIZED).send({
                    code: HttpStatus.UNAUTHORIZED,
                    message: 'Access Denied'
                });
            }
        } else {
            res.status(HttpStatus.NOT_FOUND).send({
                code: HttpStatus.NOT_FOUND,
                message: 'User not found'
            });
        }
    });
}