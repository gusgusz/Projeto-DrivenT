import Joi from 'joi';

export const PostTicketSchema = Joi.object({
  TicketTypeId: Joi.number().required,
});
