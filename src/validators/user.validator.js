import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
    const schema = Joi.object({
        firstname: Joi.string()
            .min(3)
            .required(),

        lastname: Joi.string()
            .min(3)
            .required(),

        email: Joi.string()
            .email()
            .required(),

        password: Joi.string()
            .min(3)
            .required(),

        role: Joi.string(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        next(error);
    } else {
        req.validatedBody = value;
        next();
    }
};

export const resetPasswordValidator = (req, res, next) => {
    const password = Joi.object({
        password: Joi.string()
            .min(3)
            .required(),
    });

    const { error, value } = password.validate(req.body);
    if (error) {
        next(error);
    } else {
        req.validatedBody = value;
        next();
    }
};

export const loginValidator = (req, res, next) => {
    const login = Joi.object({
        email: Joi.string()
            .email()
            .required(),

        password: Joi.string()
            .min(3)
            .required(),
    });

    const { error, value } = login.validate(req.body);
    if (error) {
        next(error);
    } else {
        req.validatedBody = value;
        next();
    }
};