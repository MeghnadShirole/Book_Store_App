import User from '../models/user.model';
import * as utils from '../utils/user.util';
import bcrypt from 'bcrypt';
import * as mailSender from '../middlewares/nodemailer.middleware'

//User Registration
export const registration = (userData) => {
    const password = utils.hashPassword(userData);
    const newUser = new User({
        "firstname": userData.firstname,
        "lastname": userData.lastname,
        "email": userData.email,
        "password": password,
        "role": userData.role
    })

    const data = new Promise((resolve, reject) => {
        newUser.save()
            .then(data => {
                resolve(data);
            }).catch(error => {
                reject(error);
            })
    });
    return data;
}

// User login
export const login = async(userData, callback) => {
    User.findOne({
        "email": userData.email
    }, (err, result) => {
        if (err) {
            callback(err, null);
        } else if (result != null) {
            const validPassword = bcrypt.compareSync(userData.password, result.password);
            if (validPassword == true) {
                const loginToken = utils.generateToken(result);
                callback(null, loginToken);
            } else {
                callback("Incorrect password")
            }
        } else {
            callback("Invalid user");
        }
    });
}

//forget password
export const forgetPassword = async(userData, callback) => {
    User.findOne({
        "email": userData.email
    }, (err, result) => {
        if (err) {
            callback(err, null);
        } else if (result != null) {
            const forgetPasswordToken = utils.forgetPasswordToken(result);

            const port = process.env.APP_PORT;
            const host = process.env.APP_HOST;
            const api_version = process.env.API_VERSION;

            const url = `${host}:${port}/api/${api_version}/users/resetPassword/${forgetPasswordToken}`;
            const mail = mailSender.sendEMail(url, userData.email);
            callback(null, `${forgetPasswordToken}`);
        } else {
            callback("Invalid user");
        }
    });
}