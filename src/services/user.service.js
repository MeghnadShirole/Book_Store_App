import User from '../models/user.model';
import * as utils from '../utils/user.util';

//User Registration
export const registration = async(userData) => {
    const password = utils.hashPassword(userData);
    var newUser = new User({
        "firstname": userData.firstname,
        "lastname": userData.lastname,
        "email": userData.email,
        "password": password,
        "role": userData.role
    });
    const result = await newUser.save(userData);
    if (!result) {
        throw error;
    } else {
        return result;
    }
};