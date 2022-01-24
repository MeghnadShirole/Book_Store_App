import User from '../models/user.model';

//User Registration
export const registration = async(userData) => {
    var newUser = new User({
        "firstname": userData.firstname,
        "lastname": userData.lastname,
        "email": userData.email,
        "password": userData.password,
        "role": userData.role
    });
    const result = await newUser.save(userData);
    if (!result) {
        throw error;
    } else {
        return result;
    }
};