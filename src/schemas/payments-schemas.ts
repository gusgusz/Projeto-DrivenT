import Joi from 'joi';

export const processPaymentSchema = Joi.object({
  issuer: Joi.string().required(),
  number: Joi.number().required(),
  name: Joi.string().required(),
  expirationDate: Joi.date().required(),
  cvv: Joi.number().required(),
});

export const ticketId = Joi.object({
  ticketId: Joi.number(),
});
