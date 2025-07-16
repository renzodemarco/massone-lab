import Joi from 'joi';

export const createReportSchema = Joi.object({
  protocolNumber: Joi.string().trim().required(),

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

  client: Joi.string().required(),

  studyType: Joi.string()
    .valid('citología', 'histopatología', 'inmunohistoquímica')
    .required(),

  macroDescription: Joi.string().trim().optional().allow(''),
  microDescription: Joi.string().trim().optional().allow(''),
  comments: Joi.string().trim().optional().allow(''),
  result: Joi.string().trim().optional().allow(''),

  images: Joi.array().items(Joi.string().trim()).optional(),

  entryDate: Joi.date().optional()
});
