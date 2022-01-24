export const admin = (req, res, next) => {
    req.body['role'] = "admin";
    next();
}