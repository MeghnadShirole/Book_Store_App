import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token for reset password
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

export const resetPasswordAuth = (req, res, next) => {
    const requestToken = req.params['token'];
    if (requestToken) {
        /**
         * @description:verifies secret and checks expression
         **/
        jwt.verify(requestToken, process.env.FORGET_PASSWORD_KEY, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    status: false,
                    message: 'Unauthorised access, please provide valid token!'
                });
            } else {
                req.userData = decode;
                req.params['userId'] = decode._id;
                next();
            }
        });
    } else {
        /**
         * @description:if there is no token return an error
         **/
        return res.send({
            status: false,
            message: 'No token provided!!'
        });
    }
}

// admin Authentication for book crud
export const adminAuth = (req, res, next) => {
    const adminToken = req.headers['token'];
    if (adminToken) {
        /**
         * @description:verifies secret key and checks expression
         **/
        jwt.verify(adminToken, process.env.ADMIN_KEY, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    status: false,
                    message: 'Unauthorised access, please provide valid token!'
                });
            } else {
                req.userData = decode;
                req.body['role'] = decode.role;
                if (decode.role == "admin") {
                    next();
                } else {
                    return res.status(401).send({
                        status: false,
                        message: 'Unauthorised access'
                    });
                }
            }
        });
    } else {
        /**
         * @description:if there is no token return an error
         **/
        return res.send({
            status: false,
            message: 'No token provided!!'
        });
    }
}