export const admin = (req, res, next) => {
    req.body['role'] = "admin";
    next();
}

export const admin = (req, res, next) => {
    req.body['role'] = "user";
    next();
}