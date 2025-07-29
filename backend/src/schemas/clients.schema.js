import Joi from 'joi';

export const createClientSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().lowercase().required(),
  address: Joi.string().trim().optional(),
  phone: Joi.string().trim().optional(),
  veterinarians: Joi.array().items(Joi.string().trim()).optional()
});

export const updateClientSchema = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().email().lowercase().trim(),
  address: Joi.string().trim(),
  phone: Joi.string().trim(),
  veterinarians: Joi.array().items(Joi.string().trim())
}).min(1);