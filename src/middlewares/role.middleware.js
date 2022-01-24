export const admin = (req, res, next) => {
    req.body['role'] = "admin";
    next();
}

export const user = (req, res, next) => {
    req.body['role'] = "user";
    next();
}