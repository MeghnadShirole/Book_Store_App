import User from '../models/user.model';
import * as utils from '../utils/user.util';

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