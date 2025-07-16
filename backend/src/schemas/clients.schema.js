import Joi from 'joi';

export const createClientSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  address: Joi.string().trim().optional(),
  phone: Joi.string().trim().optional(),
  veterinarians: Joi.array().items(Joi.string().trim()).optional()
});