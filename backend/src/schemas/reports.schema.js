import Joi from 'joi';

export const createReportSchema = Joi.object({
  protocolNumber: Joi.string().trim().required(),
  status: Joi.string().valid('entered', 'started', 'finished', 'sent', 'cancelled').optional(),

  patient: Joi.object({
    owner: Joi.string().trim().optional().allow(''),
    name: Joi.string().trim().optional().allow(''),
    species: Joi.string().trim().optional().allow(''),
    breed: Joi.string().trim().optional().allow(''),
    age: Joi.string().trim().optional().allow(''),
    sex: Joi.string().valid('macho', 'hembra').required(),
    color: Joi.string().trim().optional().allow(''),
    neutered: Joi.boolean().optional()
  }).required(),

  veterinarian: Joi.string().trim().optional().allow(''),

  client: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),

  studyType: Joi.string()
    .valid('cito', 'hp', 'ihq')
    .required(),

  sampleInfo: Joi.string().trim().optional().allow(''),

  macroDescription: Joi.string().trim().optional().allow(''),
  microDescription: Joi.string().trim().optional().allow(''),
  comments: Joi.string().trim().optional().allow(''),
  result: Joi.string().trim().optional().allow(''),

  images: Joi.array().items(Joi.string().trim()).optional(),

  dueDate: Joi.date().optional(),
  entryDate: Joi.date().optional()
});

export const updateReportSchema = Joi.object({
  protocolNumber: Joi.string().trim().optional(),
  status: Joi.string().valid('entered', 'started', 'finished', 'sent', 'cancelled').optional(),

  patient: Joi.object({
    owner: Joi.string().trim().optional().allow(''),
    name: Joi.string().trim().optional().allow(''),
    species: Joi.string().trim().optional().allow(''),
    breed: Joi.string().trim().optional().allow(''),
    age: Joi.string().trim().optional().allow(''),
    sex: Joi.string().valid('macho', 'hembra').optional(),
    color: Joi.string().trim().optional().allow(''),
    neutered: Joi.boolean().optional()
  }).optional(),

  veterinarian: Joi.string().trim().optional().allow(''),

  client: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),

  studyType: Joi.string()
    .valid('cito', 'hp', 'ihq')
    .optional(),

  sampleInfo: Joi.string().trim().optional().allow(''),

  macroDescription: Joi.string().trim().optional().allow(''),
  microDescription: Joi.string().trim().optional().allow(''),
  comments: Joi.string().trim().optional().allow(''),
  result: Joi.string().trim().optional().allow(''),

  images: Joi.array().items(Joi.string().trim()).optional(),

  entryDate: Joi.date().optional(),
  dueDate: Joi.date().optional()
});