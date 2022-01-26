import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = (userData) => {
    let saltRounds = 10;
    const hashPassword = bcrypt.hashSync(userData.password, saltRounds);
    return hashPassword;
}

export const generateToken = (result) => {
    if (result.role == "admin") {
        const adminToken = jwt.sign({ "email": result.email, "_id": result._id }, process.env.ADMIN_KEY)
        return (adminToken);
    } else {
        const userToken = jwt.sign({ "email": result.email, "_id": result._id }, process.env.USER_KEY)
        return ("Logged in as User" + userToken);
    }
}