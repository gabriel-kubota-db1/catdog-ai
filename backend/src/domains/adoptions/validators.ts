import Joi from 'joi';

export const createRequestSchema = Joi.object({
  pet_id: Joi.number().integer().required(),
});

export const updateStatusSchema = Joi.object({
  status: Joi.string().valid('approved', 'denied').required(),
});
