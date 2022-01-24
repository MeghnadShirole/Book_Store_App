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