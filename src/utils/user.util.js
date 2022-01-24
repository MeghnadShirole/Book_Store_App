import bcrypt from 'bcrypt';

export const hashPassword = (userData) => {
    let saltRounds = 10;
    const hashPassword = bcrypt.hashSync(userData.password, saltRounds);
    return hashPassword;
}