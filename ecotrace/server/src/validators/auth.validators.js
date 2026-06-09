import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Name cannot be empty',
  }),
  email: Joi.string().trim().lowercase().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email cannot be empty',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password cannot be empty',
  }),
  country: Joi.string().trim().optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
    'string.email': 'Please provide a valid email address',
  }),
  password: Joi.string().required(),
});
