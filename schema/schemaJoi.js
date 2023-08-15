import Joi from 'joi';

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^(\+\d{1,3})?[-()\d\s]+$/)
    .required(),
}).options({ abortEarly: false });

export default {
  contactsAddSchema,
} 