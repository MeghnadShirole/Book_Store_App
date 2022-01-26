import Joi from '@hapi/joi';

export const newBookValidator = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        price: Joi.string(),
        quantity: Joi.string(),
        description: Joi.string()
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        next(error);
    } else {
        req.validatedBody = value;
        next();
    }
};