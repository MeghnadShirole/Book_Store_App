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