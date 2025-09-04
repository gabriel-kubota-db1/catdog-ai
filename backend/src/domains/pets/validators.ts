import Joi from 'joi';

export const petSchema = Joi.object({
  name: Joi.string().min(2).required(),
  species: Joi.string().required(),
  breed: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
  photo_url: Joi.string().uri().required(),
  description: Joi.string().min(10).required(),
  status: Joi.string().valid('available', 'pending', 'adopted'),
});
