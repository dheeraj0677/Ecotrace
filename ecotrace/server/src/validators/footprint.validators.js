import Joi from 'joi';

export const saveFootprintSchema = Joi.object({
  inputs: Joi.object().required(),
  results: Joi.object({
    total_annual_tons: Joi.number().required(),
    total_annual_kg: Joi.number().required(),
    breakdown: Joi.object({
      home_energy: Joi.number().required(),
      transport: Joi.number().required(),
      flights: Joi.number().required(),
      food: Joi.number().required(),
      lifestyle: Joi.number().required(),
    }).required(),
    grade: Joi.string().required(),
    label: Joi.string().required(),
    percentile: Joi.number().optional(),
    trees_needed: Joi.number().required(),
    country: Joi.string().optional(),
    national_average: Joi.number().optional(),
    world_average: Joi.number().optional(),
    paris_target: Joi.number().optional(),
  }).required(),
});
